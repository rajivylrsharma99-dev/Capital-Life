const mongoose = require('mongoose');

const SupportTicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  subject: { type: String },
  category: { type: String },
  message: { type: String, required: true },
  type: { type: String, enum: ['inquiry', 'support', 'callback'], default: 'support' },
  status: { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', SupportTicketSchema);
