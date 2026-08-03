const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Load models
const User = require('./models/User');
const RiskAssessment = require('./models/RiskAssessment');
const KYCDocument = require('./models/KYCDocument');
const Subscription = require('./models/Subscription');
const SupportTicket = require('./models/SupportTicket');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'capital_life_secret_key_12345';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/capital_life';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Basic health check route
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB.');
});

// Google Authentication API
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Google Access Token is required' });
  }

  try {
    // Call Google's userinfo API using the access token
    const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!googleRes.ok) {
      const errorText = await googleRes.text();
      console.error('Google verification failed:', errorText);
      return res.status(401).json({ error: 'Failed to verify token with Google' });
    }

    const googleUser = await googleRes.json();
    
    if (!googleUser.email_verified) {
      return res.status(401).json({ error: 'Google account email is not verified' });
    }

    // Find or create the user in MongoDB
    let user = await User.findOne({ email: googleUser.email });
    if (!user) {
      user = new User({
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
        googleId: googleUser.sub
      });
    } else {
      user.picture = googleUser.picture; // Keep avatar updated
    }
    await user.save();

    // Sign session token containing user's MongoDB ID
    const sessionToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Authentication successful',
      token: sessionToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        kycStatus: user.kycStatus,
        kycDetails: user.kycDetails,
        riskProfile: user.riskProfile
      }
    });
  } catch (err) {
    console.error('Google Auth Route Error:', err);
    res.status(500).json({ error: 'Internal server error during Google Auth' });
  }
});

// GET user profile data
app.get('/api/user/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Fetch profile error:', err);
    res.status(500).json({ error: 'Server error fetching user profile' });
  }
});

// POST Risk Assessment
app.post('/api/dashboard/risk', authenticateToken, async (req, res) => {
  const { answers, calculatedProfile } = req.body;
  try {
    const assessment = new RiskAssessment({
      userId: req.user.id,
      answers,
      calculatedProfile
    });
    await assessment.save();

    // Update User model
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      { riskProfile: calculatedProfile },
      { new: true }
    );

    res.json({ 
      message: 'Risk assessment saved successfully', 
      riskProfile: updatedUser.riskProfile 
    });
  } catch (err) {
    console.error('Save risk error:', err);
    res.status(500).json({ error: 'Error saving risk assessment' });
  }
});

// POST KYC Text Details
app.post('/api/dashboard/kyc', authenticateToken, async (req, res) => {
  const { pan, mobile, dob } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      { 
        kycDetails: { pan, mobile, dob },
        kycStatus: 'submitted' 
      },
      { new: true }
    );
    res.json({ 
      message: 'KYC details updated', 
      kycStatus: updatedUser.kycStatus,
      kycDetails: updatedUser.kycDetails 
    });
  } catch (err) {
    console.error('Save KYC text error:', err);
    res.status(500).json({ error: 'Error saving KYC details' });
  }
});

// POST KYC file upload
app.post('/api/dashboard/upload', authenticateToken, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const documentType = req.body.documentType || 'other';
  try {
    const kycDoc = new KYCDocument({
      userId: req.user.id,
      documentType,
      fileName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`
    });
    await kycDoc.save();

    // Set user's KYC status to submitted
    await User.findByIdAndUpdate(req.user.id, { kycStatus: 'submitted' });

    res.json({
      message: 'File uploaded successfully',
      file: {
        id: kycDoc._id,
        name: kycDoc.fileName,
        url: kycDoc.fileUrl,
        documentType: kycDoc.documentType
      }
    });
  } catch (err) {
    console.error('Upload document error:', err);
    res.status(500).json({ error: 'Error registering uploaded file' });
  }
});

// GET list of uploaded documents
app.get('/api/dashboard/uploads', authenticateToken, async (req, res) => {
  try {
    const docs = await KYCDocument.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    console.error('Fetch uploads error:', err);
    res.status(500).json({ error: 'Error fetching uploaded documents' });
  }
});

// DELETE uploaded document
app.delete('/api/dashboard/uploads/:id', authenticateToken, async (req, res) => {
  try {
    const doc = await KYCDocument.findOne({ _id: req.params.id, userId: req.user.id });
    if (!doc) {
      return res.status(404).json({ error: 'Document not found or access denied' });
    }

    // Unlink from storage
    const filePath = path.join(__dirname, doc.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await KYCDocument.deleteOne({ _id: req.params.id });
    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    console.error('Delete upload error:', err);
    res.status(500).json({ error: 'Error deleting document' });
  }
});

// POST support ticket or public inquiry/callback
app.post('/api/support', async (req, res) => {
  const { name, email, phone, subject, category, message, type } = req.body;
  
  let userId = null;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
    } catch (e) {
      // Ignore token verification failure and treat as public/anonymous if fails
    }
  }

  try {
    const ticket = new SupportTicket({
      userId,
      name,
      email,
      phone,
      subject: subject || (type === 'callback' ? 'Callback Request' : 'General Inquiry'),
      category,
      message: message || (type === 'callback' ? `Callback requested on phone: ${phone}` : ''),
      type: type || 'support'
    });
    await ticket.save();

    // Send email notification to admin via Resend
    try {
      await resend.emails.send({
        from: 'Capital Life Support <onboarding@resend.dev>',
        to: ['rajivylrsharma99@gmail.com'],
        subject: `New ${type === 'callback' ? 'Callback' : 'Support'}: ${subject || (type === 'callback' ? 'Callback Request' : 'General Inquiry')}`,
        html: `
          <h3>New Support Inquiry Received</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Type:</strong> ${type || 'support'}</p>
          <p><strong>Subject:</strong> ${subject || (type === 'callback' ? 'Callback Request' : 'General Inquiry')}</p>
          <p><strong>Message:</strong></p>
          <p>${message || (type === 'callback' ? `Callback requested on phone: ${phone}` : 'No message provided.')}</p>
        `
      });
      console.log('Email sent successfully via Resend');
    } catch (emailErr) {
      console.error('Error sending email via Resend:', emailErr);
    }

    res.json({ message: 'Inquiry/ticket registered successfully', ticket });
  } catch (err) {
    console.error('Save ticket error:', err);
    res.status(500).json({ error: 'Error submitting support ticket' });
  }
});

// GET support ticket history
app.get('/api/support/tickets', authenticateToken, async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error('Fetch tickets error:', err);
    res.status(500).json({ error: 'Error fetching support tickets' });
  }
});

// POST subscription purchase details
app.post('/api/subscriptions/purchase', authenticateToken, async (req, res) => {
  const { planName, price, durationMonths, transactionRef } = req.body;
  try {
    const subscription = new Subscription({
      userId: req.user.id,
      planName,
      price,
      durationMonths,
      paymentDetails: {
        transactionRef
      }
    });
    await subscription.save();
    res.json({ message: 'Purchase transaction registered. Verification pending.', subscription });
  } catch (err) {
    console.error('Purchase subscription error:', err);
    res.status(500).json({ error: 'Error submitting subscription' });
  }
});

// GET user subscription history
app.get('/api/subscriptions/history', authenticateToken, async (req, res) => {
  try {
    const history = await Subscription.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error('Fetch subscriptions error:', err);
    res.status(500).json({ error: 'Error fetching subscription history' });
  }
});

// Start the server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port ${PORT}`);
});
