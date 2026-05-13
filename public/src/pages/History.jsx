import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAnalysisHistory } from "../api/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await getAnalysisHistory();
        setHistory(res.data.data);
      } catch {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading) return <p className="loading">Loading history...</p>;

  return (
    <div>
      <Navbar />
      <div className="page">
        <h2>Analysis History</h2>
        <p className="subtitle">All your past resume analyses</p>

        {history.length === 0 ? (
          <p className="empty-msg">No analyses yet. Upload and analyze a resume first!</p>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div key={item._id} className="resume-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <p className="filename" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>📄 {item.resume?.filename || "Unknown file"}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span className="keyword-tag green" style={{ margin: 0 }}>ATS: {item.atsScore} / 100</span>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>
                <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '12px', flexGrow: 1 }}>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>{item.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        )}



      </div>
    </div>
  );
}

export default History;
