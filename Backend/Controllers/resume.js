const ResumeModel=require('../Models/resume');
const multer=require("multer");
const pdfParse = require("pdf-parse");
// const pdfParse = require("pdf-parse").default;
const path=require("path");
const {CohereClient} = require("cohere-ai");


require("dotenv").config();

const fs = require("fs");
const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

exports.addResume = async (req, res) => {
let pdfPath;


try {
    const { job_desc, user } = req.body;

    if (!req.file) {
        return res.status(400).json({
            error: "Resume file is required",
        });
    }

    pdfPath = req.file.path;

    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    if (!pdfData.text || !pdfData.text.trim()) {
    return res.status(400).json({
        error: "Could not extract text from this PDF. Please upload a text-based PDF.",
    });
}

    const prompt = `
    You are a resume screening assistant.

    Compare the following resume text with the provided Job Description (JD).

    Give:
    1. Match score (0-100)
    2. Reason

    Resume:
    ${pdfData.text}

    Job Description:
    ${job_desc}

    Return the score and a brief explanation in this format:
    Score: XX
    Reason: ...
    `;

    const response = await cohere.chat({
        model: "command-a-03-2025",
        message: prompt,
        temperature: 0.7,
        max_tokens: 300,
    });

    const result = response.text;

    const match = result.match(/Score:\s*(\d{1,3})/i);

const extractedScore = match ? parseInt(match[1], 10) : null;

const score =
    extractedScore !== null && extractedScore >= 0 && extractedScore <= 100
        ? extractedScore
        : null;
    

    const reasonMatch = result.match(/Reason:\s*([\s\S]*)/i);
    const reason = reasonMatch ? reasonMatch[1].trim() : null;

    const newResume = new ResumeModel({
        user,
        resume_name: req.file.originalname,
        job_desc,
        score,
        feedback: reason,
    });

    await newResume.save();

    res.status(200).json({
        message: "Your analysis are ready",
        data: newResume,
    });

} catch (err) {
    res.status(500).json({
        error: "Server error",
        message: err.message,
    });

} finally {
    if (pdfPath && fs.existsSync(pdfPath)) {
        try {
            fs.unlinkSync(pdfPath);
        } catch (err) {
            // Temporary file cleanup failed.
        }
    }
}

};

exports.getAllResumeForUser = async (req, res) => {
try {
const { user } = req.params;

    const resumes = await ResumeModel.find({ user: user })
        .sort({ createdAt: -1 });

    return res.status(200).json({
        message: "Your Previous History",
        resumes: resumes,
    });

} catch (err) {
    return res.status(500).json({
        error: "Server error",
        message: err.message,
    });
}

};

exports.getResumeForAdmin = async (req, res) => {
try {
const resumes = await ResumeModel.find({})
.sort({ createdAt: -1 })
.populate("user");

    return res.status(200).json({
        message: "Fetched All History",
        resumes: resumes,
    });

} catch (err) {
    return res.status(500).json({
        error: "Server error",
        message: err.message,
    });
}

};
