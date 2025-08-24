import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* Logo + Name */}
        <div className="footer-logo">
          <div className="footer-logo-icon">🌱</div>
          <h3>Mission Parivartan</h3>
        </div>

        {/* Tagline */}
        <p className="footer-description">
          Creating positive change for a sustainable future
        </p>

        {/* Social Icons */}
        <div className="footer-social">
          <Facebook className="footer-social-icon" size={24} />
          <Twitter className="footer-social-icon" size={24} />
          <Instagram className="footer-social-icon" size={24} />
          <Linkedin className="footer-social-icon" size={24} />
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© 2025 Mission Parivartan. All rights reserved. 🌍</p>
        </div>
      </div>
    </footer>
  );
}
