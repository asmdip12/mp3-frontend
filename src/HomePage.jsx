import React, { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";


const MissionParivartanHomepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('About');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleButtonClick = (e) => {
    const ripple = document.createElement('span');
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    e.currentTarget.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };
  const { auth } = useAuth(); // assuming auth.user is null if not logged in
  const navigate = useNavigate();

  const handleButtonClick1 = () => {
    navigate('/signup');
  };


  const features = [
    {
      icon: '🎯',
      title: 'Targeted Approach',
      description: 'Strategic initiatives are implemented in areas where they can create maximum environmental and social impact.',
      link: 'Learn More'
    },
    {
      icon: '👥',
      title: 'Technology Driven',
      description: 'We use state-of-the-art technology and data analytics to track progress and optimize our environmental solutions.',
      link: 'See Technology'
    },
    {
      icon: '🔗',
      title: 'Community Centered',
      description: 'Local community involvement and grassroots participation ensures sustainable long-term environmental change.',
      link: 'Join Community'
    },
    {
      icon: '📊',
      title: 'Data Results',
      description: 'Real results backed by comprehensive monitoring and evaluation with transparent reporting of environmental impact.',
      link: 'View Results'
    }
  ];

  return (
    <div className="homepage">
      <style jsx>{`
        .homepage {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #rgb(46, 125, 50);
          background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
          min-height: 100vh;
        }

        /* Header Styles */
        .header {
          background: ${isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)'};
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: background 0.3s ease;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: bold;
          color: #38a169;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #68d391, #38a169);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          text-decoration: none;
          color: #4a5568;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .nav-link:hover, .nav-link.active {
          background: #e6fffa;
          color: #38a169;
        }

        .auth-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
        }

        .btn-login {
          background: #4299e1;
          color: white;
        }

        .btn-login:hover {
          background: #3182ce;
          transform: translateY(-1px);
        }

        .btn-signup {
          background: transparent;
          color: #4299e1;
          border: 2px solid #4299e1;
        }

        .btn-signup:hover {
          background: #4299e1;
          color: white;
          transform: translateY(-1px);
        }

        /* Hero Section */
        .hero {
          padding: 4rem 2rem;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.8;
        }

        /* Why Section */
        .why-section {
          padding: 4rem 2rem;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 2.5rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 3rem;
          justify-content: center;
        }

        .why-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .why-text {
          background: #2d3748;
          color: white;
          padding: 2.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out;
        }

        .why-text p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .highlight {
          color: #68d391;
          font-weight: 600;
        }

        .poster-card {
          background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.6s ease-out;
        }

        .poster-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: shimmer 3s infinite;
        }

        .poster-header {
          background: #38a169;
          color: white;
          padding: 1rem;
          margin: -2rem -2rem 2rem -2rem;
          font-size: 1.1rem;
          font-weight: bold;
        }

        .poster-title {
          font-size: 2rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 1rem;
        }

        .poster-icons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0;
          font-size: 3rem;
        }

        .cta-button {
          background: #38a169;
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          position: relative;
          overflow: hidden;
        }

        .cta-button:hover {
          background: #2f855a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Features Section */
        .features {
          padding: 4rem 2rem;
          background: #edfdf5;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: all 0.3s ease;
          border-top: 4px solid #68d391;
          animation: fadeInUp 0.6s ease-out;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #68d391, #38a169);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
          font-size: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: #4a5568;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .feature-link {
          color: #38a169;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .feature-link:hover {
          color: #2f855a;
          gap: 1rem;
        }

        /* Join Section */
        .join-section {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
          text-align: center;
        }

        .join-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .join-section h2 {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 1rem;
        }

        .join-section p {
          font-size: 1.1rem;
          color: #4a5568;
          margin-bottom: 2rem;
          line-height: 1.8;
        }

        .join-button {
          background: linear-gradient(135deg, #38a169, #2f855a);
          color: white;
          padding: 1rem 3rem;
          border: none;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(56, 161, 105, 0.3);
          position: relative;
          overflow: hidden;
        }

        .join-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(56, 161, 105, 0.4);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        :global(.ripple) {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-container {
            flex-direction: column;
            gap: 1rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .why-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .section-title {
            font-size: 2rem;
            text-align: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .poster-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding: 2rem 1rem;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .why-section, .features, .join-section {
            padding: 2rem 1rem;
          }

          .btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.8rem;
          }

          .auth-buttons {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      // `}</style>

      <div>bscvsbvcb
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Mission Parivartan</h1>
          <p className="hero-subtitle">
            Transforming communities through environmental action and sustainable tree plantation initiatives
          </p>
        </div>
      </section>
      


  

  
    <section
      id="tree-plantation"
      style={{
        background: "#e1f1e1",
        color: "rgb(46, 125, 50)",
        padding: isMobile ? "3rem 0" : "6rem 0",
        position: "relative"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem"
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "1.8rem" : "2.5rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "2rem",
            color: "rgb(27, 94, 32)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem"
          }}
        >
          <span
            style={{
              fontSize: isMobile ? "2.5rem" : "3rem",
              filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))"
            }}
          >
            🌱
          </span>
          Why Tree Plantation?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "2rem" : "4rem",
            alignItems: "center"
          }}
        >
          {/* Left Text Content */}
          <div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "1rem",
                padding: isMobile ? "1.5rem" : "2.5rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
              }}
            >
              <p
                style={{
                  marginBottom: "1.5rem",
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  lineHeight: "1.8",
                  color: "rgb(46, 125, 50)"
                }}
              >
                In 2025, India continues to face urgent environmental challenges — including rapid deforestation,
                climate instability, and rising pollution levels. Tree plantations play a crucial role in restoring
                ecological balance, improving air quality, and combating climate change.
              </p>
              <p
                style={{
                  marginBottom: "1.5rem",
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  lineHeight: "1.8",
                  color: "rgb(46, 125, 50)"
                }}
              >
                The latest reports show that forest cover is still below the recommended 33%, making large-scale
                reforestation critical. Tree plantations help absorb carbon dioxide, filter pollutants, and increase
                biodiversity, making our cities and villages greener and healthier.
              </p>
              <p
                style={{
                  marginBottom: 0,
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  lineHeight: "1.8",
                  color: "rgb(46, 125, 50)"
                }}
              >
                <strong
                  style={{
                    color: "#10b981",
                    fontWeight: 600,
                    textShadow: "0 0 10px rgba(16, 185, 129, 0.3)"
                  }}
                >
                  Mission Parivartan
                </strong>{" "}
                leads impactful plantation drives across India. From school campuses to urban corners, we engage
                communities through awareness programs, restoration projects, and sustainable green initiatives.
              </p>
            </div>
          </div>

          {/* Right Image Content */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                transition: "transform 0.3s ease"
              }}
            >
              <img
                src="/pic.png"
                alt="Tree Plantation Activity"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transition: "transform 0.3s ease"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0, 0, 0, 0.8))",
                  padding: "1.5rem",
                  transform: "translateY(100%)",
                  transition: "transform 0.3s ease"
                }}
                className="image-overlay"
              >
                <span
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1.1rem"
                  }}
                >
                  Tree Plantation Activity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a href="#" className="feature-link">
                  {feature.link} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Mission Section */}
      <section className="join-section">
        <div className="join-content">
          <h2>Join Our Mission</h2>
          <p>Login to start your tree planting journey and track your environmental impact</p>
          {!auth.user && (
        <button className="join-button" onClick={handleButtonClick1}>
          Login to Get Started
        </button>
      )}
        </div>
      </section>
    </div>
  );
};

export default MissionParivartanHomepage;