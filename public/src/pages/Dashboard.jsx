import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProfile, getAllResumes, deleteResume } from "../api/api";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const userRes = await getProfile();
        setUser(userRes.data.data);

        const resumeRes = await getAllResumes();
        setResumes(resumeRes.data.data);
      } catch {
        // If not logged in, go to login page
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await deleteResume(id);
        setResumes(resumes.filter((r) => r._id !== id));
      } catch (err) {
        alert("Failed to delete resume");
      }
    }
  }

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="page">
        <h2>Hello, {user?.username} 👋</h2>
        <p className="subtitle">Here's a summary of your resumes</p>

        <div className="stats-row">
          <div className="stat-card">
            <h3>{resumes.length}</h3>
            <p>Resumes Uploaded</p>
          </div>
        </div>

        <div className="section-header">
          <h3>Your Resumes</h3>
          <button onClick={() => navigate("/upload")} className="primary-btn">
            + Upload New
          </button>
        </div>

        {resumes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h3>No resumes yet!</h3>
            <p>Upload your first resume to get instant AI feedback and an ATS score.</p>
            <button onClick={() => navigate("/upload")} className="primary-btn mt-3">
              Upload Resume
            </button>
          </div>
        ) : (
          <div className="resume-list">
            {resumes.map((resume) => (
              <div key={resume._id} className="resume-card">
                <p className="filename">📄 {resume.filename}</p>
                <p className="upload-time" style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "12px" }}>
                  Uploaded: {new Date(resume.createdAt).toLocaleString()}
                </p>
                <span className="badge">{resume.filetype.toUpperCase()}</span>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="analyze-btn"
                    style={{ flex: 1 }}
                    onClick={() => navigate(`/analyze/${resume._id}`)}
                  >
                    Analyze
                  </button>
                  <button
                    className="outline-btn"
                    style={{ color: "#d32f2f", borderColor: "#d32f2f", padding: "0.8rem" }}
                    onClick={() => handleDelete(resume._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
