const analysismodel = require("../models/analysis.model");
const resumemodel = require("../models/resume.model");
const { analyzeWithAI } = require("../services/ai.service");

async function createAnalysisController(req, res) {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    const resume = await resumemodel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const aiResult = await analyzeWithAI(resume.extractedtext);

   
    const analysis = await analysismodel.create({
      resume: resumeId,
      atsScore: aiResult.score,
      feedback: aiResult.feedback,
      keywordsMatched: aiResult.keywordsMatched,
      missingKeywords: aiResult.missingKeywords,
    });

    return res.status(200).json({
      message: "Analysis completed",
      data: analysis,
    });
  } catch (error) {
    console.error("Analysis Error:", error);
    return res.status(500).json({ message: "AI Analysis failed" });
  }
}

async function getAnalysisHistoryController(req, res) {
  try {
    
    const resumes = await resumemodel
      .find({ user: req.user._id })
      .select("_id");
    const resumeIds = resumes.map((r) => r._id);

   
    const analyses = await analysismodel
      .find({ resume: { $in: resumeIds } })
      .populate("resume", "filename filetype")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Analysis history fetched",
      data: analyses,
    });
  } catch {
    return res.status(500).json({ message: "Failed to fetch history" });
  }
}

module.exports = {
  createAnalysisController,
  getAnalysisHistoryController,
};
