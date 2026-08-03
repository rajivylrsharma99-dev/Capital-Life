import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message, type } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields (name, email, or phone)' });
  }

  try {
    const data = await resend.emails.send({
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

    return res.status(200).json({ message: 'Inquiry sent successfully', data });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ error: err.message || 'Failed to send inquiry' });
  }
}
