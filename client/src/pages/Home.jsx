import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      
      {/* Black Background Top Area */}
      <div className="split-layout">
        <div className="split-top"></div>
        
        {/* Navbar inside the black top */}
        <nav className="home-nav">
          <h2 className="logo">Hire<span>Lens</span></h2>
          <div className="home-nav-links">
            <button onClick={() => navigate("/login")} className="outline-btn">Sign In</button>
          </div>
        </nav>

        {/* Hero Area inside the black top */}
        <div className="home-hero">
          <h1>
            Hire <span className="highlight">Lens.</span>
          </h1>
          <p>Get instant ATS scores, keyword gap analysis, and AI feedback to land your dream job.</p>
          <button onClick={() => navigate("/register")} className="primary-btn">Get Started Free →</button>
        </div>

        {/* Overlapping Cards Slider Style Area */}
        <div className="cards-slider-container">
          
          <div className="feature-card card-1">
            <p>"Detect missing keywords from job descriptions and improve your ATS compatibility instantly"</p>
            <div className="card-footer">
              <div className="card-avatar">🤖</div>
              <div>
                <h4>Smart Keyword Analysis</h4>
                <span>Resume Optimization</span>
              </div>
            </div>
          </div>

          <div className="feature-card card-2">
            <p>"Get section-by-section AI feedback to improve clarity, impact, and recruiter readability."</p>
            <div className="card-footer">
              <div className="card-avatar">✨</div>
              <div>
                <h4>AI Feedback Engine</h4>
                <span>Powered by Google Gemini</span>
              </div>
            </div>
          </div>

          <div className="feature-card card-3">
            <p>"Calculate ATS scores in real time based on formatting, keywords, and resume structure."</p>
            <div className="card-footer">
              <div className="card-avatar">📊</div>
              <div>
                <h4>ATS Score Analysis</h4>
                <span>Real-time Scoring</span>
              </div>
            </div>
          </div>

          <div className="feature-card card-4">
            <p>"Upload PDF or DOCX resumes and receive instant analysis within seconds."</p>
            <div className="card-footer">
              <div className="card-avatar">🚀</div>
              <div>
                <h4>Instant Results</h4>
                <span>PDF & DOCX Support</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;
