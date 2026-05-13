const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  atsScore: {
    type: Number,
    required: true
  },
  feedback: {
    type: String, 
    required: true
  },
  keywordsMatched: [String], 
  missingKeywords: [String], 
  aiResponseRaw: {
    type: Object 
  }
}, { timestamps: true });

module.exports = mongoose.model('Analysis', AnalysisSchema);