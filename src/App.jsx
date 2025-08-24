import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './Navbar';
import HomePage from './HomePage';
import About from './About';
import WhyMP from './WhyMP';
import Gallery from './Gallery';
import Contact from './Contact';
import Register from './Register';
import Footer from './Footer';
import TreeForm from './TreeForm'; // ✅ Import TreeForm
// import ProfilePage from './profile';
import SignupForm from './Register';
import LoginForm from './LoginModal';     // ✅ Import AdminLogin
import AdminDashboard from './admin/AdminDashboard';


function AppContent() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/whymp" element={<WhyMP />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/TreeForm" element={<TreeForm />} /> ✅ New Route
          
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
   
      <Router>
        <AppContent />
      </Router>
    
  );
}
