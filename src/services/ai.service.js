const { GoogleGenerativeAI } = require("@google/generative-ai");

async function analyzeWithAI(resumeText) {
  try {
   
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      throw new Error("GEMINI_API_KEY is missing or invalid");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Using gemini-flash-latest as older 1.5 models are deprecated
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `You are an encouraging and supportive career coach and resume expert. Analyze this resume and ALWAYS reply in VALID JSON ONLY. Do not use markdown tags like \`\`\`json. 

    IMPORTANT RULES FOR FEEDBACK:
    1. First, identify their primary tech stack or domain (e.g., MERN stack, Java Developer, UI/UX). 
    2. Start your feedback by praising their current stack (e.g., "Your current MERN stack foundation is excellent!"). 
    3. Treat "missingKeywords" not as critical failures, but as gentle suggestions to boost their score (e.g., "If you add some DevOps or Cloud skills like Docker or AWS, it will really boost your score and make you stand out").
    4. Keep the tone polite, professional, and highly encouraging.

    Return EXACTLY this format:
    {
      "score": <number 0-100 based on overall strength and ATS compatibility>,
      "feedback": "encouraging overall feedback following the rules above",
      "keywordsMatched": ["keyword1", "keyword2"],
      "missingKeywords": ["skill_to_boost_score1", "skill_to_boost_score2"]
    }
    
    Resume Text:
    ${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();
    
    // Clean up any markdown json formatting if Gemini happens to add it
    const cleanText = rawText.replace(/```json/gi, "").replace(/```/gi, "").trim();
    
    return JSON.parse(cleanText);

  } catch (error) {
    console.error("Gemini Error:", error.message);
    
    // Fallback response so the app doesn't break during college presentations
    return {
      score: 75,
      feedback: "This is a simulated fallback response because your Gemini API key is missing or invalid. The resume shows a good foundation but could use more quantifiable achievements. Ensure your skills section directly matches the job description you are targeting.",
      keywordsMatched: ["React", "JavaScript", "HTML", "CSS", "Node.js"],
      missingKeywords: ["Docker", "AWS", "CI/CD", "TypeScript"]
    };
  }
}

module.exports = { analyzeWithAI };
