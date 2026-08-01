const mongoose = require('mongoose');

const KYCDocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentType: { type: String, enum: ['pan', 'aadhar', 'address', 'other'], required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('KYCDocument', KYCDocumentSchema);
