const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planName: { type: String, required: true },
  price: { type: Number, required: true },
  durationMonths: { type: Number, required: true },
  paymentDetails: {
    transactionRef: { type: String },
    paymentScreenshotUrl: { type: String }
  },
  status: { type: String, enum: ['pending_verification', 'active', 'expired', 'rejected'], default: 'pending_verification' },
  activatedAt: { type: Date },
  expiresAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
