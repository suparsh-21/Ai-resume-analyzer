import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api";

// Predefined security questions user can pick from
const SECURITY_QUESTIONS = [
  "What is the name of your first pet?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What is your favourite movie?",
  "What city were you born in?",
  "What is the name of your childhood best friend?",
];

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState(SECURITY_QUESTIONS[0]);
  const [securityAnswer, setSecurityAnswer] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({ username, email, password, securityQuestion, securityAnswer });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Start analyzing your resume with AI</p>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Security Question Section */}
          <p className="section-label">Security Question (for password recovery)</p>

          <select
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
            className="select-input"
          >
            {SECURITY_QUESTIONS.map((q, i) => (
              <option key={i} value={q}>{q}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Your answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
