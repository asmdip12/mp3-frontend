import React from 'react';
import { AlertTriangle, Target, Users, Leaf, TreePine, Thermometer, Calendar, TrendingUp } from 'lucide-react';

const WhyMissionParivartan = () => {
  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .container {
          min-height: 100vh;
          max-width:100%;
          background: linear-gradient(135deg, #f0fdf4, #ecfdf5, #f0fdfa);
        }


        /* Main Content */
        .main-content {
          padding: 60px 20px;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Section 1: Why Mission Parivartan is Different */
        .section-1 {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          background: #d1fae5;
          color: #065f46;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 48px;
          font-weight: bold;
          color: #065f46;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 18px;
          color: #059669;
          max-width: 800px;
          margin: 0 auto 48px auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-bottom: 40px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid #a7f3d0;
          border-radius: 20px;
          padding: 32px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #a7f3d0, #6ee7b7);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
          color: #065f46;
        }

        .feature-title {
          font-size: 20px;
          font-weight: bold;
          color: #065f46;
          margin-bottom: 12px;
        }

        .feature-description {
          color: #059669;
          font-size: 14px;
          line-height: 1.5;
        }

        .feature-link {
          color: #047857;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          margin-top: 12px;
          display: inline-block;
        }

        /* Single Feature Card */
        .single-feature {
          max-width: 400px;
          margin: 0 auto;
        }

        /* Section 2: Environmental Change */
        .section-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .environmental-content {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid #a7f3d0;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .env-badge {
          background: #fef3c7;
          color: #92400e;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 20px;
        }

        .env-title {
          font-size: 32px;
          font-weight: bold;
          color: #065f46;
          margin-bottom: 16px;
        }

        .env-title .highlight {
          color: #059669;
        }

        .env-description {
          color: #047857;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .environmental-issues {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .issue-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: rgba(254, 242, 242, 0.5);
          border-radius: 16px;
          border-left: 4px solid #f87171;
        }

        .issue-icon {
          width: 24px;
          height: 24px;
          color: #dc2626;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .issue-content h4 {
          color: #dc2626;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .issue-content p {
          color: #6b7280;
          font-size: 14px;
          line-height: 1.4;
        }

        /* Impact Tracker */
        .impact-tracker {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid #a7f3d0;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .tracker-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .tracker-title {
          font-size: 24px;
          font-weight: bold;
          color: #065f46;
          margin-bottom: 8px;
        }

        .impact-stats {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .stat-item {
          background: #f0fdf4;
          border-radius: 16px;
          padding: 20px;
          border: 1px solid #bbf7d0;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .stat-label {
          color: #065f46;
          font-weight: 600;
          font-size: 14px;
        }

        .stat-value {
          color: #059669;
          font-weight: bold;
          font-size: 16px;
        }

        .stat-bar {
          width: 100%;
          height: 8px;
          background: #dcfce7;
          border-radius: 4px;
          overflow: hidden;
        }

        .stat-progress {
          height: 100%;
          border-radius: 4px;
          transition: width 0.8s ease;
        }

        .stat-progress.trees {
          background: linear-gradient(90deg, #22c55e, #16a34a);
          width: 75%;
        }

        .stat-progress.carbon {
          background: linear-gradient(90deg, #10b981, #059669);
          width: 60%;
        }

        .stat-progress.biodiversity {
          background: linear-gradient(90deg, #f59e0b, #d97706);
          width: 85%;
        }

        /* Environmental Timeline */
        .timeline-section {
          margin-top: 32px;
        }

        .timeline-title {
          font-size: 18px;
          font-weight: bold;
          color: #065f46;
          margin-bottom: 20px;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .timeline-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(239, 246, 255, 0.5);
          border-radius: 12px;
          border-left: 4px solid #3b82f6;
        }

        .timeline-dot {
          width: 12px;
          height: 12px;
          background: #3b82f6;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .timeline-content h5 {
          color: #1e40af;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .timeline-content p {
          color: #6b7280;
          font-size: 12px;
        }

        /* Call to Action Section */
        .cta-section {
          background: linear-gradient(135deg, #059669, #0d9488);
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
          margin-top: 80px;
          color: white;
        }

        .cta-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
        }

        .cta-title {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 16px;
        }

        .cta-description {
          font-size: 18px;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto 32px auto;
          line-height: 1.6;
        }

        .cta-options {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 32px;
        }

        .cta-option {
          text-align: center;
        }

        .cta-option h4 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .cta-option p {
          opacity: 0.8;
          font-size: 14px;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .cta-btn {
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid white;
        }

        .cta-btn.primary {
          background: white;
          color: #059669;
        }

        .cta-btn.primary:hover {
          background: #f0fdf4;
          transform: translateY(-2px);
        }

        .cta-btn.secondary {
          background: transparent;
          color: white;
        }

        .cta-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav {
            display: none;
          }

          .section-title {
            font-size: 36px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .section-2 {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .cta-options {
            flex-direction: column;
            gap: 16px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .main-content {
            padding: 40px 16px;
          }
        }
      `}</style>

      <div className="container">
       
        {/* Main Content */}
        <main className="main-content">
          
          {/* Section 1: Why Mission Parivartan is Different */}
          <section className="section-1">
            <div className="section-badge">
              
            </div>
            <h2 className="section-title">
              Why <span style={{color: '#059669'}}>Mission Parivartan</span> is Different
            </h2>
            <p className="section-subtitle">
              We don't just talk about environmental change, we implement solutions directly. Our sustainable approach and grassroots community involvement makes a real difference.
            </p>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Target size={28} />
                </div>
                <h3 className="feature-title">Targeted Approach</h3>
                <p className="feature-description">
                  Strategic initiatives are implemented in areas where they can create maximum environmental and social impact.
                </p>
                <a href="#" className="feature-link">Learn More →</a>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Users size={28} />
                </div>
                <h3 className="feature-title">Technology Driven</h3>
                <p className="feature-description">
                  We use state-of-the-art technology and data analytics to track progress and optimize our environmental solutions.
                </p>
                <a href="#" className="feature-link">See Technology →</a>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Leaf size={28} />
                </div>
                <h3 className="feature-title">Community Centered</h3>
                <p className="feature-description">
                  Local community involvement and grassroots participation ensures sustainable long-term environmental change.
                </p>
                <a href="#" className="feature-link">Join Community →</a>
              </div>
            </div>

            <div className="single-feature">
              <div className="feature-card">
                <div className="feature-icon">
                  <TreePine size={28} />
                </div>
                <h3 className="feature-title">Data Results</h3>
                <p className="feature-description">
                  Real results backed by comprehensive monitoring and evaluation with transparent reporting of environmental impact.
                </p>
                <a href="#" className="feature-link">View Results →</a>
              </div>
            </div>
          </section>

          {/* Section 2: Environmental Change & Impact Tracker */}
          <section className="section-2">
            
            {/* Left: Environmental Content */}
            <div className="environmental-content">
              <div className="env-badge">🚨 Environmental Crisis</div>
              <h2 className="env-title">
                Measurable <span className="highlight">Environmental Change</span>
              </h2>
              <p className="env-description">
                Help Mission Parivartan find solutions against environmental degradation and build a sustainable future for our communities and environment.
              </p>

              <div className="environmental-issues">
                <div className="issue-item">
                  <AlertTriangle className="issue-icon" size={24} />
                  <div className="issue-content">
                    <h4>Rapid Deforestation</h4>
                    <p>We lose 18.7 million acres of forest annually, equivalent to 27 soccer fields every minute.</p>
                  </div>
                </div>

                <div className="issue-item">
                  <Thermometer className="issue-icon" size={24} />
                  <div className="issue-content">
                    <h4>Climate Change</h4>
                    <p>Global temperature increase and 1.1°C since pre-industrial times, causing extreme weather events.</p>
                  </div>
                </div>

                <div className="issue-item">
                  <AlertTriangle className="issue-icon" size={24} />
                  <div className="issue-content">
                    <h4>Health Impact</h4>
                    <p>Air pollution causes 7 million premature deaths annually, with other areas most affected.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Impact Tracker */}
            <div className="impact-tracker">
              <div className="tracker-header">
                <h3 className="tracker-title">Live Impact Tracker</h3>
              </div>

              <div className="impact-stats">
                <div className="stat-item">
                  <div className="stat-header">
                    <span className="stat-label">🌳 Trees Planted</span>
                    <span className="stat-value">2,456</span>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-progress trees"></div>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-header">
                    <span className="stat-label">🌍 Carbon Offset</span>
                    <span className="stat-value">1,234t</span>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-progress carbon"></div>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-header">
                    <span className="stat-label">🦋 Biodiversity Projects</span>
                    <span className="stat-value">8,920+</span>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-progress biodiversity"></div>
                  </div>
                </div>
              </div>

              <div className="timeline-section">
                <h4 className="timeline-title">Environmental Impact Timeline</h4>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h5>Record Wildfires</h5>
                      <p>Australia and California faced devastating wildfires</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h5>Extreme Weather</h5>
                      <p>Unprecedented floods and hurricanes across the globe</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h5>Biodiversity Loss</h5>
                      <p>68% decline in wildlife populations since 1970</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h5>Tipping Points</h5>
                      <p>Critical ecological tipping points being reached</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="cta-section">
            <div className="cta-icon">🌱</div>
            <h2 className="cta-title">Be Part of the Solution</h2>
            <p className="cta-description">
              The environmental crisis requires immediate action, and Mission Parivartan offers multiple pathways to become part of a movement that is creating measurable change for our planet.
            </p>

            <div className="cta-options">
              <div className="cta-option">
                <h4>Today</h4>
                <p>Start Now</p>
              </div>
              <div className="cta-option">
                <h4>Free</h4>
                <p>No Cost</p>
              </div>
              <div className="cta-option">
                <h4>Lifetime</h4>
                <p>Impact</p>
              </div>
            </div>

            <div className="cta-buttons">
              <button className="cta-btn primary">Get Started</button>
              <button className="cta-btn secondary">Learn More</button>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default WhyMissionParivartan;