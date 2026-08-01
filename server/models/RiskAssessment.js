const mongoose = require('mongoose');

const RiskAssessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: {
    dob: { type: String },
    occupation: { type: String },
    goals: { type: String },
    income: { type: String },
    expense: { type: String },
    assets: { type: String },
    dependents: { type: String },
    scenario: { type: String },
    experience: { type: String },
    awareness: { type: String }
  },
  calculatedProfile: { type: String, required: true }, // Conservative, Balanced, Aggressive
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RiskAssessment', RiskAssessmentSchema);
