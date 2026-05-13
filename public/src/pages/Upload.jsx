import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { uploadResume } from "../api/api";

function Upload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setMessage("");
    setError("");
  }

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      return setError("Please select a file first");
    }

    // We use FormData to send file to backend
    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setError("");

    try {
      const res = await uploadResume(formData);
      setMessage("Resume uploaded successfully! ✅");
      // Go to dashboard after 1.5 seconds
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="page">
        <h2>Upload Your Resume</h2>
        <p className="subtitle">Supports PDF and DOCX files up to 5MB</p>

        <div className="upload-card">
          <form onSubmit={handleUpload}>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="file-input"
            />

            {file && (
              <p className="file-name">Selected: {file.name}</p>
            )}

            {error && <p className="error-msg">{error}</p>}
            {message && <p className="success-msg">{message}</p>}

            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
