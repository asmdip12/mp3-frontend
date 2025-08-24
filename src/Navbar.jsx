import React, { useState } from "react";
import { Link, useLocation, NavLink  ,useNavigate} from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./Register";
import { useAuth } from "./AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const { auth, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkStyles = ({ isActive }) =>
    `px-3 py-1 rounded hover:bg-amber-300 transition duration-200 ${
      isActive ? "bg-amber-300 font-bold" : "text-black"
    }`;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
    const navigate = useNavigate();
  
    const logoutHandler = () => {
      logout(); // your logout logic
      navigate("/"); // go to homepage
    };
  

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Brand Section */}
          <div className="navbar-brand">
            <div className="brand-content">
              <div className="brand-icon">🌱</div>
              <Link to="/" className="brand-text">
                <span className="brand-mission">Mission</span>
                <span className="brand-parivartan">Parivartan</span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="navbar-links">
            <Link to="/about" className="nav-link">
              <span className="nav-icon"></span>
              <span>About</span>
            </Link>
            <Link to="/whymp" className="nav-link">
              <span className="nav-icon"></span>
              <span>WhyMP</span>
            </Link>
            {/* <Link to="/gallery" className="nav-link">
              <span className="nav-icon">📸</span>
              <span>Gallery</span>
            </Link>
            <Link to="/contact" className="nav-link">
              <span className="nav-icon">📧</span>
              <span>Contact</span>
            </Link> */}
          </div>

          {/* Auth Section */}
          <div className="auth-section">
            <ul className="loginsignbtn">
              {!auth.isAuthenticated && (
                <>
                  
                    <NavLink to="/login" className="auth-btn login-btn">
                      <span className="btn-icon"></span>
                      <span>LogIn</span>
                    </NavLink>
                  
                    <NavLink to="/signup" className="auth-btn signup-btn">
                      <span className="btn-icon"></span>
                      <span>SignUp</span>
                    </NavLink>
                 
                </>
              )}
              {auth.isAuthenticated && (
                <>
                  
                    <button onClick={logoutHandler} className="auth-btn logout-btn">
                      <span className="btn-icon">👋</span>
                      <span>Logout</span>
                    </button>
                  
                </>
              )}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-nav-links">
              <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-icon"></span>
                <span>About</span>
              </Link>
              <Link to="/whymp" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-icon"></span>
                <span>WhyMP</span>
              </Link>
              {/* <Link to="/gallery" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-icon">📸</span>
                <span>Gallery</span>
              </Link>
              <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-icon">📧</span>
                <span>Contact</span>
              </Link> */}
            </div>

            <div className="mobile-auth-section">
              {!auth.isAuthenticated && (
                <>
                  <NavLink to="/login" className="mobile-auth-btn login-btn" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="btn-icon"></span>
                    <span>LogIn</span>
                  </NavLink>
                  <NavLink to="/signup" className="mobile-auth-btn signup-btn" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="btn-icon"></span>
                    <span>SignUp</span>
                  </NavLink>
                </>
              )}
              {auth.isAuthenticated && (
                <button onClick={() => { logoutHandler(); setIsMobileMenuOpen(false); }} className="mobile-auth-btn logout-btn">
                  <span className="btn-icon">👋</span>
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
        />
      )}
    </>
  );
}