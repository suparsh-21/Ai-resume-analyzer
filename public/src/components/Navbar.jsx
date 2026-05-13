import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api";

function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <h2 className="logo">✦ Hire<span>Lens</span></h2>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/history">History</Link>
        <button onClick={handleLogout} className="outline-btn" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem', marginLeft: '1rem' }}>Sign Out</button>
      </div>
    </nav>
  );
}

export default Navbar;
