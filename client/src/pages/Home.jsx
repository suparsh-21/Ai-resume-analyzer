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
            <p>"This AI analyzer found exact missing keywords from the job description! It's so easy to use, and my resume score skyrocketed."</p>
            <div className="card-footer">
              <div className="card-avatar">🤖</div>
              <div>
                <h4>Smart AI</h4>
                <span>Keyword Gap Analysis</span>
              </div>
            </div>
          </div>

          <div className="feature-card card-2">
            <p>"I couldn't imagine applying to jobs without it. The section-by-section feedback from Gemini is absolutely fantastic."</p>
            <div className="card-footer">
              <div className="card-avatar">✨</div>
              <div>
                <h4>Gemini 1.5</h4>
                <span>Actionable Feedback</span>
              </div>
            </div>
          </div>

          <div className="feature-card card-3">
            <p>"It perfectly matches what recruiters see in their Applicant Tracking Systems. Highly recommended tool for job seekers."</p>
            <div className="card-footer">
              <div className="card-avatar">📊</div>
              <div>
                <h4>ATS Score</h4>
                <span>Real-time Scoring</span>
              </div>
            </div>
          </div>

          <div className="feature-card card-4">
            <p>"Built specifically for modern job applications. Easy to use, great ui, and the results are instant and highly accurate."</p>
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
