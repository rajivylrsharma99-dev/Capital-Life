const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String },
  googleId: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  kycStatus: { type: String, enum: ['pending', 'submitted', 'approved', 'rejected'], default: 'pending' },
  kycDetails: {
    pan: { type: String, default: '' },
    mobile: { type: String, default: '' },
    dob: { type: String, default: '' }
  },
  riskProfile: { type: String, enum: ['', 'Conservative', 'Balanced', 'Aggressive'], default: '' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
