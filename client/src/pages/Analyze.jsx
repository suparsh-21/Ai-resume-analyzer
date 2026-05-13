import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { analyzeResume, getResume } from "../api/api";

function Analyze() {
  const { id } = useParams(); // resume ID from the URL
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch resume details for preview
  useEffect(() => {
    async function loadResume() {
      try {
        const res = await getResume(id);
        setResumeData(res.data.data);
      } catch (err) {
        setError("Failed to load resume preview.");
      }
    }
    loadResume();
  }, [id]);

  async function handleAnalyze() {
    setLoading(true);
    setError("");

    try {
      const res = await analyzeResume(id);
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="page">
        <h2>Resume Analysis</h2>
        <p className="subtitle">Preview your resume text and analyze it with AI</p>

        {error && <p className="error-msg">{error}</p>}

        {!result && resumeData && (
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #ddd", marginBottom: "1.5rem" }}>
              <h4 style={{ marginBottom: "10px" }}>📄 Resume Text Preview:</h4>
              <div style={{ backgroundColor: "#f4f7eb", padding: "1rem", borderRadius: "8px", maxHeight: "200px", overflowY: "auto", fontSize: "0.9rem", color: "#333", whiteSpace: "pre-wrap" }}>
                {resumeData.extractedtext || "No text could be extracted."}
              </div>
            </div>
            
            <button onClick={handleAnalyze} disabled={loading} className="primary-btn">
              {loading ? "Analyzing... (this may take a few seconds)" : "🤖 Analyze with AI"}
            </button>
          </div>
        )}

        {result && (
          <div className="result-card">
            <div className="score-box">
              <h3>ATS Score</h3>
              <span className="score">{result.atsScore} / 100</span>
              <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "12px", fontStyle: "italic", maxWidth: "600px", margin: "12px auto 0" }}>
                Disclaimer: This score is strictly an AI-generated assessment. It is intended solely as a reference point and should not be construed as a definitive professional evaluation of your qualifications.
              </p>
            </div>

            <div className="feedback-box">
              <h4>Feedback</h4>
              <p>{result.feedback}</p>
            </div>

            <div className="keywords-row">
              <div className="keywords-box matched">
                <h4>✅ Keywords Matched</h4>
                {result.keywordsMatched?.length > 0 ? (
                  result.keywordsMatched.map((kw, i) => (
                    <span key={i} className="keyword-tag green">{kw}</span>
                  ))
                ) : (
                  <p>None found</p>
                )}
              </div>

              <div className="keywords-box missing">
                <h4>❌ Missing Keywords</h4>
                {result.missingKeywords?.length > 0 ? (
                  result.missingKeywords.map((kw, i) => (
                    <span key={i} className="keyword-tag red">{kw}</span>
                  ))
                ) : (
                  <p>None missing</p>
                )}
              </div>
            </div>

            <div className="feedback-box" style={{ marginTop: "20px", backgroundColor: "#f0fdf4", borderLeft: "4px solid #37eb5f", padding: "1.5rem", borderRadius: "12px" }}>
              <h4 style={{ marginBottom: "12px", color: "#0b0b0b" }}>💡 Pro Tips to Maximize Your ATS Score</h4>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "#333", fontSize: "0.95rem" }}>
                <li><strong>Tailor Your Keywords:</strong> Always include the exact skills and keywords mentioned in the job description you are targeting.</li>
                <li><strong>Use Standard Section Headings:</strong> ATS bots look for standard terms like "Experience," "Education," and "Skills." Avoid creative titles.</li>
                <li><strong>Quantify Achievements:</strong> Use metrics and numbers (e.g., "Increased performance by 30%") instead of vague descriptions.</li>
                <li><strong>Avoid Complex Formatting:</strong> Keep it clean. Avoid tables, columns, graphics, or weird fonts which can confuse ATS parsers.</li>
                <li><strong>Save as PDF or DOCX:</strong> Stick to standard formats to ensure the system can extract your text accurately.</li>
              </ul>
            </div>

            <button onClick={() => navigate("/dashboard")} className="secondary-btn" style={{ marginTop: "2rem" }}>
              ← Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analyze;
