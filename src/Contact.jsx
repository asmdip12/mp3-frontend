import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const ContactPage = () => {
  const handleSendMessage = () => {
    alert("Message sent! We'll get back to you soon.");
  };

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
          width:100%
        }

        .container {
          min-height: 100vh;
          max-width:100%;
          background: linear-gradient(135deg, #ecfdf5, #f0fdfa, #f0fdf4);
        }

        
        /* Hero Section */
        .hero {
          padding: 64px 20px;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero h2 {
          font-size: 48px;
          font-weight: bold;
          color: #065f46;
          margin-bottom: 16px;
        }

        .hero p {
          font-size: 20px;
          color: #059669;
          line-height: 1.6;
        }

        /* Main Content */
        .main-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px 64px 20px;
        }

        .cards-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #a7f3d0;
          padding: 32px;
          transition: all 0.3s ease;
        }

        .card:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-header-icon {
          width: 32px;
          height: 32px;
          background: #d1fae5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-size: 18px;
        }

        .card h3 {
          font-size: 24px;
          font-weight: bold;
          color: #065f46;
          margin: 0;
        }

        .card-description {
          color: #059669;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        /* Contact Info Items */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-item {
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .info-item.email {
          background: rgba(209, 250, 229, 0.5);
        }

        .info-item.phone {
          background: rgba(204, 251, 241, 0.5);
        }

        .info-item.address {
          background: rgba(220, 252, 231, 0.5);
        }

        .info-item.hours {
          background: rgba(207, 250, 254, 0.5);
        }

        .info-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-icon.email {
          background: #bbf7d0;
          color: #047857;
        }

        .info-icon.phone {
          background: #99f6e4;
          color: #0f766e;
        }

        .info-icon.address {
          background: #bbf7d0;
          color: #15803d;
        }

        .info-icon.hours {
          background: #a5f3fc;
          color: #0891b2;
        }

        .info-content h4 {
          font-weight: 600;
          color: #065f46;
          margin-bottom: 8px;
        }

        .info-content p {
          color: #059669;
          margin: 0;
        }

        .info-content p:hover {
          color: #047857;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        /* Social Media Buttons */
        .social-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .social-btn {
          padding: 16px 24px;
          border-radius: 16px;
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transform: scale(1.05);
        }

        .social-btn.facebook {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .social-btn.twitter {
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
        }

        .social-btn.instagram {
          background: linear-gradient(135deg, #ec4899, #f43f5e);
        }

        .social-btn.linkedin {
          background: linear-gradient(135deg, #059669, #0d9488);
        }

        /* Contact Form */
        .contact-form {
          background: linear-gradient(135deg, #ecfdf5, #f0fdfa);
          border-radius: 16px;
          padding: 24px;
        }

        .contact-form h4 {
          font-weight: 600;
          color: #065f46;
          margin-bottom: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #a7f3d0;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }

        .form-textarea {
          resize: none;
          height: 100px;
        }

        .form-submit {
          width: 100%;
          background: linear-gradient(135deg, #059669, #0d9488);
          color: white;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .form-submit:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transform: scale(1.02);
        }

        /* Footer */
        .footer {
          background: #065f46;
          color: white;
          padding: 48px 20px;
          text-align: center;
        }

        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .footer-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #14b8a6, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .footer-logo h3 {
          font-size: 20px;
          font-weight: bold;
          margin: 0;
        }

        .footer-description {
          color: #a7f3d0;
          margin-bottom: 16px;
        }

        .footer-social {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 32px;
        }

        .footer-social-icon {
          color: #a7f3d0;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .footer-social-icon:hover {
          color: white;
        }

        .footer-bottom {
          margin-top: 32px;
          padding-top: 32px;
          border-top: 1px solid #047857;
        }

        .footer-bottom p {
          color: #6ee7b7;
          font-size: 14px;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav {
            display: none;
          }

          .cards-container {
            grid-template-columns: 1fr;
          }

          .hero h2 {
            font-size: 36px;
          }

          .hero p {
            font-size: 18px;
          }

          .social-grid {
            grid-template-columns: 1fr;
          }

          .header-content {
            padding: 12px 16px;
          }

          .main-content {
            padding: 0 16px 48px 16px;
          }

          .hero {
            padding: 48px 16px;
          }
        }
      `}</style>

<div>s  
  s s
</div>
      <div className="container">
      

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h2>Contact Us</h2>
            <p>
              Get in touch with Mission Parivartan. We're here to help and answer any questions<br />
              you might have.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="main-content">
          <div className="cards-container">
            
            {/* Get in Touch Card */}
            <div className="card">
              <div className="card-header">
                <div className="card-header-icon">💬</div>
                <h3>Get in Touch</h3>
              </div>
              <p className="card-description">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>

              <div className="contact-info">
                {/* Email Section */}
                <div className="info-item email">
                  <div className="info-icon email">
                    <Mail size={24} />
                  </div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>contact@missionparivartan.org</p>
                    <p>support@missionparivartan.org</p>
                  </div>
                </div>

                {/* Phone Section */}
                <div className="info-item phone">
                  <div className="info-icon phone">
                    <Phone size={24} />
                  </div>
                  <div className="info-content">
                    <h4>Phone</h4>
                    <p>+91 9893695526</p>
                    <p>+91 9926304727</p>
                  </div>
                </div>

                {/* Address Section */}
                <div className="info-item address">
                  <div className="info-icon address">
                    <MapPin size={24} />
                  </div>
                  <div className="info-content">
                    <h4>Address</h4>
                    <p>123 Social Impact Street</p>
                    <p>Community Block, New Delhi</p>
                    <p>India - 110001</p>
                  </div>
                </div>

                {/* Office Hours Section */}
                <div className="info-item hours">
                  <div className="info-icon hours">
                    <Clock size={24} />
                  </div>
                  <div className="info-content">
                    <h4>Office Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us Card */}
            <div className="card">
              <div className="card-header">
                <div className="card-header-icon">🌍</div>
                <h3>Follow Us</h3>
              </div>
              <p className="card-description">
                Stay connected with our mission and updates
              </p>

              <div className="social-grid">
                <button className="social-btn facebook">
                  <Facebook size={20} />
                  Facebook
                </button>
                
                <button className="social-btn twitter">
                  <Twitter size={20} />
                  Twitter
                </button>
                
                <button className="social-btn instagram">
                  <Instagram size={20} />
                  Instagram
                </button>
                
                <button className="social-btn linkedin">
                  <Linkedin size={20} />
                  LinkedIn
                </button>
              </div>

              {/* Contact Form */}
              <div className="contact-form">
                <h4>Send us a message</h4>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="form-input"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email"
                    className="form-input"
                  />
                  <textarea 
                    placeholder="Your Message"
                    className="form-input form-textarea"
                  ></textarea>
                  <button 
                    onClick={handleSendMessage}
                    className="form-submit"
                  >
                    Send Message 🌱
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        

        
      </div>
    </div>
  );
};

export default ContactPage;