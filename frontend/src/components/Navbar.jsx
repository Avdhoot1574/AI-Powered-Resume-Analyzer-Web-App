import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">R</span>
        ResumeAI
      </Link>

      <Link to="/analyze" className="nav-link">
        Analyze Resume
      </Link>
    </nav>
  );
}

export default Navbar;