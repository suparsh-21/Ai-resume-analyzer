const resumemodel = require("../models/resume.model");
const { extractText } = require("../utils/extractText");

async function uploadResumeController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    
    const extractedtext = await extractText(req.file);

    
    const resume = await resumemodel.create({
      user: req.user._id,
      filename: req.file.originalname,
      filetype: req.file.mimetype === "application/pdf" ? "pdf" : "docx",
      fileurl: "local",
      extractedtext,
    });

    return res.status(201).json({
      message: "Resume uploaded successfully",
      data: {
        id: resume._id,
        filename: resume.filename,
        filetype: resume.filetype,
      },
    });
  } catch {
    return res.status(500).json({ message: "Failed to upload resume" });
  }
}

async function getAllResumesController(req, res) {
  try {
    const resumes = await resumemodel
      .find({ user: req.user._id })
      .select("-extractedtext"); 

    return res.status(200).json({
      message: "Resumes fetched successfully",
      data: resumes,
    });
  } catch {
    return res.status(500).json({ message: "Failed to fetch resumes" });
  }
}

async function getResumeByIdController(req, res) {
  try {
    const resume = await resumemodel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Resume fetched successfully",
      data: resume,
    });
  } catch {
    return res.status(500).json({ message: "Failed to fetch resume" });
  }
}

async function deleteResumeController(req, res) {
  try {
    const resume = await resumemodel.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch {
    return res.status(500).json({ message: "Failed to delete resume" });
  }
}

module.exports = {
  uploadResumeController,
  getAllResumesController,
  getResumeByIdController,
  deleteResumeController,
};
