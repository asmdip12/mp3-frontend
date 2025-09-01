import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Event handlers
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  const logoutHandler = () => {
    logout();
    navigate("/");
    closeMobileMenu();
  };

  const handleProfileClick = () => {
    navigate("/profile");
    closeMobileMenu();
  };

  // Theme colors
  const colors = {
    primary: '#10b981',
    primaryDark: '#059669',
    white: '#ffffff',
    whiteTransparent: 'rgba(255, 255, 255, 0.15)',
    whiteHover: 'rgba(255, 255, 255, 0.25)',
    red: '#ef4444',
    redHover: '#dc2626',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    shadowHover: '0 8px 30px rgba(0, 0, 0, 0.2)'
  };

  // Reusable style objects
  const styles = {
    // Main navbar
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
      boxShadow: colors.shadow,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
    },

    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '0 1rem' : '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: isMobile ? '70px' : '80px',
    },

    // Brand styles
    brand: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: colors.white,
      transition: 'transform 0.3s ease',
      zIndex: 1001,
    },

    brandIcon: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      marginRight: isMobile ? '0.5rem' : '0.75rem',
      animation: 'pulse 2s infinite',
    },

    brandText: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.2,
    },

    brandMission: {
      fontSize: isMobile ? '1rem' : '1.25rem',
      fontWeight: 600,
      color: '#f0fdf4',
    },

    brandParivartan: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: 800,
      color: colors.white,
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },

    // Navigation links (desktop only)
    navLinks: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      gap: '2rem',
    },

    navLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: colors.white,
      textDecoration: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      position: 'relative',
    },

    // Auth section
    authSection: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      gap: '1rem',
    },

    authButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
    },

    loginButton: {
      background: colors.whiteTransparent,
      color: colors.white,
      border: `2px solid ${colors.whiteTransparent}`,
    },

    signupButton: {
      background: colors.white,
      color: colors.primary,
    },

    profileButton: {
      background: colors.whiteTransparent,
      color: colors.white,
      border: `2px solid ${colors.whiteTransparent}`,
    },

    logoutButton: {
      background: colors.red,
      color: colors.white,
    },

    // Mobile menu button
    mobileMenuBtn: {
      display: isMobile ? 'flex' : 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50px',
      height: '50px',
      background: colors.whiteTransparent,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 1001,
    },

    hamburgerLine: {
      width: '25px',
      height: '3px',
      background: colors.white,
      margin: '3px 0',
      borderRadius: '2px',
      transition: 'all 0.3s ease',
      transformOrigin: 'center',
    },

    // Mobile menu overlay
    mobileOverlay: {
      position: 'fixed',
      top: isMobile ? '70px' : '80px',
      left: 0,
      right: 0,
      height: `calc(100vh - ${isMobile ? '70px' : '80px'})`,
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
      transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease',
      zIndex: 999,
      overflowY: 'auto',
    },

    mobileContent: {
      padding: '2rem 1.5rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },

    mobileNavLinks: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '3rem',
    },

    mobileNavLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      color: colors.white,
      textDecoration: 'none',
      padding: '1.25rem',
      borderRadius: '12px',
      fontSize: '1.25rem',
      fontWeight: 600,
      background: colors.whiteTransparent,
      transition: 'all 0.3s ease',
    },

    mobileAuthSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: 'auto',
    },

    mobileAuthButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '1.25rem',
      borderRadius: '12px',
      border: 'none',
      fontWeight: 700,
      fontSize: '1.1rem',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },

    // Spacer
    spacer: {
      height: isMobile ? '70px' : '80px',
      width: '100%',
    },

    // Backdrop
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 998,
      opacity: isMobileMenuOpen ? 1 : 0,
      visibility: isMobileMenuOpen ? 'visible' : 'hidden',
      transition: 'all 0.3s ease',
    },
  };

  // Hover handlers for interactive effects
  const handleMouseEnter = (e, hoverStyle) => {
    Object.assign(e.target.style, hoverStyle);
  };

  const handleMouseLeave = (e, normalStyle) => {
    Object.assign(e.target.style, normalStyle);
  };

  return (
    <>
      {/* Add CSS keyframes */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
        `}
      </style>

      <nav style={styles.navbar}>
        <div style={styles.container}>
          {/* Brand */}
          <Link 
            to="/" 
            style={styles.brand}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            onClick={closeMobileMenu}
          >
            <span style={styles.brandIcon}>🌱</span>
            <div style={styles.brandText}>
              <span style={styles.brandMission}>Mission</span>
              <span style={styles.brandParivartan}>Parivartan</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div style={styles.navLinks}>
            <NavLink 
              to="/about" 
              style={styles.navLink}
              onMouseEnter={(e) => {
                e.target.style.background = colors.whiteHover;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <span>About</span>
            </NavLink>
            <NavLink 
              to="/whymp" 
              style={styles.navLink}
              onMouseEnter={(e) => {
                e.target.style.background = colors.whiteHover;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <span>WhyMP</span>
            </NavLink>
            
          </div>

          {/* Desktop Auth */}
          <div style={styles.authSection}>
            {!auth.isAuthenticated ? (
              <>
                <NavLink 
                  to="/login" 
                  style={{...styles.authButton, ...styles.loginButton}}
                  onMouseEnter={(e) => {
                    e.target.style.background = colors.whiteHover;
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = colors.whiteTransparent;
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <span>Login</span>
                </NavLink>
                <NavLink 
                  to="/signup" 
                  style={{...styles.authButton, ...styles.signupButton}}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f0fdf4';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = colors.white;
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <span>Sign Up</span>
                </NavLink>
              </>
            ) : (
              <>
                <button 
                  onClick={handleProfileClick}
                  style={{...styles.authButton, ...styles.profileButton}}
                  onMouseEnter={(e) => {
                    e.target.style.background = colors.whiteHover;
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = colors.whiteTransparent;
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <span>👤</span>
                  <span>Profile</span>
                </button>
                <button 
                  onClick={logoutHandler}
                  style={{...styles.authButton, ...styles.logoutButton}}
                  onMouseEnter={(e) => {
                    e.target.style.background = colors.redHover;
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = colors.red;
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={styles.mobileMenuBtn}
            onClick={toggleMobileMenu}
            onMouseEnter={(e) => {
              e.target.style.background = colors.whiteHover;
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.whiteTransparent;
              e.target.style.transform = 'scale(1)';
            }}
          >
            <span style={{
              ...styles.hamburgerLine,
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(8px, 8px)' : 'rotate(0)'
            }}></span>
            <span style={{
              ...styles.hamburgerLine,
              opacity: isMobileMenuOpen ? '0' : '1',
              transform: isMobileMenuOpen ? 'scale(0)' : 'scale(1)'
            }}></span>
            <span style={{
              ...styles.hamburgerLine,
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(8px, -8px)' : 'rotate(0)'
            }}></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div style={styles.mobileOverlay}>
          <div style={styles.mobileContent}>
            <div style={styles.mobileNavLinks}>
              <NavLink 
                to="/about" 
                style={styles.mobileNavLink}
                onClick={closeMobileMenu}
                onMouseEnter={(e) => e.target.style.background = colors.whiteHover}
                onMouseLeave={(e) => e.target.style.background = colors.whiteTransparent}
              >
                <span>About</span>
              </NavLink>
              <NavLink 
                to="/whymp" 
                style={styles.mobileNavLink}
                onClick={closeMobileMenu}
                onMouseEnter={(e) => e.target.style.background = colors.whiteHover}
                onMouseLeave={(e) => e.target.style.background = colors.whiteTransparent}
              >
                <span>WhyMP</span>
              </NavLink>
              
            </div>

            <div style={styles.mobileAuthSection}>
              {!auth.isAuthenticated ? (
                <>
                  <NavLink 
                    to="/login" 
                    style={{...styles.mobileAuthButton, ...styles.loginButton}}
                    onClick={closeMobileMenu}
                  >
                    <span>Login</span>
                  </NavLink>
                  <NavLink 
                    to="/signup" 
                    style={{...styles.mobileAuthButton, ...styles.signupButton}}
                    onClick={closeMobileMenu}
                  >
                    <span>Sign Up</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleProfileClick}
                    style={{...styles.mobileAuthButton, ...styles.profileButton}}
                  >
                    <span>👤</span>
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={logoutHandler}
                    style={{...styles.mobileAuthButton, ...styles.logoutButton}}
                  >
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Backdrop */}
        <div style={styles.backdrop} onClick={closeMobileMenu}></div>
      </nav>

      {/* Spacer */}
      <div style={styles.spacer}></div>
    </>
  );
}