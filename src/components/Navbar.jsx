import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";
import logo from "../assets/logo.jpg";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isHOD } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo">
            <img src={logo} alt="Logo" width={40} height={40} />
          </div>
          <div className="brand-text">
            <h1>BGI Launchpad</h1>
            <p>Campus Hub & Community</p>
          </div>
        </div>

        <div className="navbar-actions">
          {user && (
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-links">
        <Link
          to="/announcements"
          className={
            isActive("/announcements") ? "nav-link active" : "nav-link"
          }
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7h10v2H5V7zm8 4H5v-2h8v2z" />
          </svg>
          Announcements
        </Link>

        <Link
          to="/events"
          className={isActive("/events") ? "nav-link active" : "nav-link"}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
          </svg>
          Events
        </Link>

        <Link
          to="/lost-found"
          className={isActive("/lost-found") ? "nav-link active" : "nav-link"}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          Lost & Found
        </Link>

        {isHOD() && (
          <Link
            to="/admin"
            className={isActive("/admin") ? "nav-link active" : "nav-link"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
