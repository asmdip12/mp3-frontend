import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from 'react';

const MissionParivartan = () => {
  const [activeSection, setActiveSection] = useState('');
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleClick = () => {
    if (auth.user) {
      navigate("/treeform"); // if logged in
    } else {
      navigate("/login"); // if not logged in
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const styles = {
    // Global styles
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      lineHeight: '1.6',
      color: '#333',
      marginTop:
      windowWidth < 480
        ? "-15px" // mobile
        : windowWidth < 768
        ? "-10px" // tablet
        : "110px", 
      padding: 0,
    },
// gh
    // Hero section styles
    hero: {
      background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
      color: 'white',
      paddingTop: '8rem',
      paddingBottom: '4rem',
      textAlign: 'center',
      marginTop: '70px',
    },
    heroContent: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 2rem',
    },
    heroTitle: {
      fontSize: '3rem',
      marginBottom: '1rem',
      fontWeight: 700,
    },
    heroSubtitle: {
      fontSize: '1.2rem',
      marginBottom: '3rem',
      opacity: 0.9,
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem',
    },
    feature: {
      textAlign: 'center',
    },
    featureNumber: {
      fontSize: '2.5rem',
      marginBottom: '0.5rem',
      fontWeight: 700,
    },
    featureText: {
      fontSize: '1rem',
      opacity: 0.9,
    },
    ctaButton: {
      background: 'white',
      color: '#4caf50',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '30px',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
    },

    // Main content styles
    mainContent: {
      maxWidth: '100%',
      margin: '80px 0 0 0',
      width: '100%',
      background:'#edfdf5',
      
      padding: '',
    },
    section: {
      marginBottom: '6rem',
    },
    sectionTitle: {
      fontSize: '2.5rem',
      color: '#2e7d32',
      textAlign: 'center',
      marginBottom: '3rem',
      fontWeight: 700,
    },

    // Innovation section styles
    innovationSection: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'start',
    },
    innovationContent: {
      // Content styles
    },
    innovationTitle: {
      fontSize: '2.2rem',
      color: '#2e7d32',
      marginBottom: '1.5rem',
      fontWeight: 700,
    },
    innovationSubtitle: {
      color: '#4caf50',
      fontWeight: 500,
      marginBottom: '1rem',
    },
    innovationDescription: {
      fontSize: '1.1rem',
      color: '#666',
      marginBottom: '2rem',
      lineHeight: 1.7,
    },
    statsRow: {
      display: 'flex',
      gap: '3rem',
      marginBottom: '2rem',
    },
    stat: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '2.5rem',
      color: '#2e7d32',
      marginBottom: '0.5rem',
      fontWeight: 700,
    },
    statText: {
      color: '#666',
      fontWeight: 500,
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
    },
    featureListItem: {
      padding: '0.5rem 0',
      color: '#666',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },

    // Impact card styles
    impactCard: {
      background: 'linear-gradient(135deg, #e8f5e8, #f1f8e9)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    impactTitle: {
      fontSize: '1.8rem',
      color: '#2e7d32',
      marginBottom: '2rem',
      textAlign: 'center',
      fontWeight: 700,
    },
    progressItem: {
      marginBottom: '1.5rem',
    },
    progressLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.5rem',
      fontWeight: 600,
    },
    progressBar: {
      background: '#e0e0e0',
      height: '8px',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: '4px',
      transition: 'width 0.8s ease',
    },
    progressFillGreen: {
      background: '#4caf50',
    },
    progressFillOrange: {
      background: '#ff9800',
    },
    goalsSection: {
      marginTop: '2rem',
      paddingTop: '2rem',
      borderTop: '2px solid #e8f5e8',
    },
    goalsSectionTitle: {
      color: '#2e7d32',
      marginBottom: '1rem',
      fontWeight: 700,
    },
    goalItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
    },

    // Cards grid styles
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardIcon: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      margin: '0 auto 1.5rem',
    },
    cardTitle: {
      fontSize: '1.5rem',
      color: '#2e7d32',
      textAlign: 'center',
      marginBottom: '1rem',
      fontWeight: 700,
    },
    cardDescription: {
      color: '#666',
      textAlign: 'center',
      marginBottom: '1.5rem',
      lineHeight: 1.6,
    },
    cardList: {
      listStyle: 'none',
      color: '#666',
      padding: 0,
    },
    cardListItem: {
      padding: '0.3rem 0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },

    // Stats cards styles
    statsCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginBottom: '4rem',
    },
    statCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    statIcon: {
      fontSize: '30px',
      marginBottom: '1rem',
    },
    statCardNumber: {
      fontSize: '2.5rem',
      color: '#2e7d32',
      marginBottom: '0.5rem',
      fontWeight: 700,
    },
    statCardText: {
      color: '#666',
      fontWeight: 600,
    },

    // Why different section styles
    differentCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    },
    differentCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
    },
    differentCardIcon: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #4db6ac, #26a69a)',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      margin: '0 auto 1.5rem',
    },
    differentCardTitle: {
      fontSize: '1.3rem',
      color: '#2e7d32',
      marginBottom: '1rem',
      fontWeight: 700,
    },
    differentCardDescription: {
      color: '#666',
      fontSize: '0.9rem',
      marginBottom: '1.5rem',
      lineHeight: 1.6,
    },
    learnMore: {
      color: '#4caf50',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '0.9rem',
    },

    // Responsive styles
    '@media (max-width: 768px)': {
      heroTitle: {
        fontSize: '2rem',
      },
      innovationSection: {
        gridTemplateColumns: '1fr',
        gap: '2rem',
      },
      statsRow: {
        flexDirection: 'column',
        gap: '1rem',
        textAlign: 'center',
      },
      mainContent: {
        padding: '2rem 1rem',
      },
      sectionTitle: {
        fontSize: '2rem',
      },
      cardsGrid: {
        gridTemplateColumns: '1fr',
      },
      differentCards: {
        gridTemplateColumns: '1fr',
      },
    },
  };

  return (
    <div style={styles.container}>
      <main style={styles.mainContent}>
        {/* About Organization Section */}
      <section id="about" style={styles.section}>
          <h2 style={styles.sectionTitle}>About Mission Parivartan Organisation</h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto 3rem',
          }}>
            Welcome to our green mission. We are a living change through environmental awareness and action. Together, we're not just planting trees - we're cultivating hope.
          </p>
          
          <div style={styles.statsCards}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🏔️</div>
              <h3 style={styles.statCardNumber}>50,000+</h3>
              <p style={styles.statCardText}>Trees Planted</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🌍</div>
              <h3 style={styles.statCardNumber}>25,000+</h3>
              <p style={styles.statCardText}>Lives Impacted</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📊</div>
              <h3 style={styles.statCardNumber}>95%</h3>
              <p style={styles.statCardText}>Success Rate</p>
            </div>
          </div>
          </section>


          {/* Impact Areas Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Impact Areas</h2>
          <div style={styles.cardsGrid}>
            <div 
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
            >
              <div style={styles.cardIcon}>🌳</div>
              <h3 style={styles.cardTitle}>Transforming Lives Through Trees</h3>
              <p style={styles.cardDescription}>
                We don't just plant trees; we cultivate sustainable environmental change by empowering individual and collective action. Together, we're building a greener future that reflects our commitment to meaningful environmental impact.
              </p>
              <ul style={styles.cardList}>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Evidence-based planting strategies that work
                </li>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Tree survival data protection-focused approach
                </li>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Monitor communities and sustainable environments
                </li>
              </ul>
            </div>

            <div 
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
            >
              <div style={styles.cardIcon}>♻️</div>
              <h3 style={styles.cardTitle}>Green Action</h3>
              <p style={styles.cardDescription}>
                We partner with local communities and environmental organizations to implement sustainable practices that create lasting change for our planet and future generations.
              </p>
              <ul style={styles.cardList}>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Community-driven environmental initiatives
                </li>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Sustainable waste management programs
                </li>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Local ecosystem restoration projects
                </li>
              </ul>
            </div>
          </div>
        </section>


        {/* Mission Goals Section */}
        <section style={styles.section}>
          <div style={styles.cardsGrid}>
            <div 
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
            >
              <div style={styles.cardIcon}>🌱</div>
              <h3 style={styles.cardTitle}>Greener Planet</h3>
              <p style={styles.cardDescription}>
                Our mission contributes to reforestation efforts and environmental restoration, fostering a generation of environmental advocates who are passionate about creating positive change.
              </p>
              <ul style={styles.cardList}>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Large-scale reforestation campaigns
                </li>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Biodiversity conservation programs
                </li>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Climate change mitigation efforts
                </li>
              </ul>
            </div>

            <div 
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
            >
              <div style={styles.cardIcon}>🌍</div>
              <h3 style={styles.cardTitle}>Healthier Planet</h3>
              <p style={styles.cardDescription}>
                We advocate for sustainable practices and environmental awareness, creating a healthier planet for future generations and current communities through innovative green solutions.
              </p>
              <ul style={styles.cardList}>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Air quality improvement initiatives
                </li>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Environmental education programs
                </li>
                <li style={styles.cardListItem}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                  Green technology adoption support
                </li>
              </ul>
            </div>
          </div>
        </section>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Join Our Green Revolution</h1>
          <p style={styles.heroSubtitle}>
            Every tree planted is a step towards a sustainable future. Be part of something bigger than yourself – be part of the change.
          </p>
          
          <div style={styles.featuresGrid}>
            <div style={styles.feature}>
              <h3 style={styles.featureNumber}>Free</h3>
              <p style={styles.featureText}>Plant Distribution</p>
            </div>
            <div style={styles.feature}>
              <h3 style={styles.featureNumber}>24/7</h3>
              <p style={styles.featureText}>Expert Support</p>
            </div>
            <div style={styles.feature}>
              <h3 style={styles.featureNumber}>100%</h3>
              <p style={styles.featureText}>Transparent Tracking</p>
            </div>
          </div>
          
          <button 
            style={styles.ctaButton}
            onClick={handleClick}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = 'none';
            }}
          >
            Get Your Free Plants
          </button>
        </div>
      </section>
        

        

        
        
      </main>
    </div>
  );
};

export default MissionParivartan;
