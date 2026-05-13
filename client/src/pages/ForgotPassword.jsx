import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getSecurityQuestion, resetPassword } from "../api/api";

function ForgotPassword() {
  const navigate = useNavigate();

  // We have 3 steps:
  // Step 1 → enter email, get security question
  // Step 2 → answer security question
  // Step 3 → enter new password → done
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Step 1: Get security question ──
  async function handleGetQuestion(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await getSecurityQuestion(email);
      setSecurityQuestion(res.data.securityQuestion);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Email not found");
    } finally {
      setLoading(false);
    }
  }

  // ── Step 2: Verify answer + enter new password → reset ──
  async function handleReset(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await resetPassword({ email, securityAnswer, newPassword });
      setStep(3); // show success screen
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* ── Step 1: Enter Email ── */}
        {step === 1 && (
          <>
            <h2>Forgot Password 🔑</h2>
            <p className="subtitle">Enter your email to get your security question</p>

            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleGetQuestion}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Checking..." : "Continue →"}
              </button>
            </form>

            <p className="switch-link">
              <Link to="/login">← Back to Login</Link>
            </p>
          </>
        )}

        {/* ── Step 2: Answer Question + New Password ── */}
        {step === 2 && (
          <>
            <h2>Security Question 🛡️</h2>

            <div className="question-box">
              <p className="question-label">Your question:</p>
              <p className="question-text">{securityQuestion}</p>
            </div>

            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleReset}>
              <input
                type="text"
                placeholder="Your answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New password (min 6 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <p className="switch-link">
              <span
                style={{ cursor: "pointer", color: "#a78bfa" }}
                onClick={() => { setStep(1); setError(""); }}
              >
                ← Back
              </span>
            </p>
          </>
        )}

        {/* ── Step 3: Success ── */}
        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "48px" }}>✅</p>
            <h2>Password Reset!</h2>
            <p className="subtitle">Your password has been updated successfully.</p>
            <button onClick={() => navigate("/login")} style={{ marginTop: "16px" }}>
              Go to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;
