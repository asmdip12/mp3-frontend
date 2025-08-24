import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userJsonUrl, setUserJsonUrl] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const [pendingSignup, setPendingSignup] = useState(false);
  const [verifyMode, setVerifyMode] = useState('phone'); // 'phone' or 'email'

  const isBasicInfoFilled = name.trim() !== '' && password.length >= 6;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isBasicInfoFilled) return;

    // if (verifyMode === 'phone') {
    //   const phoneScript = document.createElement('script');
    //   phoneScript.src = 'https://www.phone.email/sign_in_button_v1.js';
    //   phoneScript.async = true;
    //   document.querySelector('.pe_signin_button')?.appendChild(phoneScript);

    //   window.phoneEmailListener = async function (userObj) {
    //     try {
    //       const response = await axios.get(userObj.user_json_url);
    //       const data = response.data;

    //       setVerificationData({
    //         email: data.user_email_id,
    //         phone: data.user_phone_number,
    //         countryCode: data.user_country_code,
    //       });

    //       setUserJsonUrl(userObj.user_json_url);
    //       alert(`✅ Phone verified!\nClick Create Account to continue.`);
    //     } catch (err) {
    //       console.error('Error fetching data:', err.message);
    //       alert('Verification failed!');
    //     }
    // //   };
    // } else 
    if (verifyMode === 'email') {
      const emailScript = document.createElement('script');
      emailScript.src = 'https://www.phone.email/verify_email_v1.js';
      emailScript.async = true;
      document.querySelector('.pe_verify_email')?.appendChild(emailScript);

      window.phoneEmailReceiver = async function (userObj) {
        try {
          const response = await axios.get(userObj.user_json_url);
          const data = response.data;

          setVerificationData({
            email: data.user_email_id,
            phone: null,
            countryCode: null,
          });

          setUserJsonUrl(userObj.user_json_url);
          alert(`✅ Email verified!\nClick create account to continue.`);
          // console.log(userObj.user_json_url);
          
          await completeSignup(userObj.user_json_url); // Auto-signup for email
        } catch (err) {
          // console.error('Error fetching data:', err.message);
          alert('Email verification failed!');
        }
      };
    }

    return () => {
      window.phoneEmailListener = null;
      window.phoneEmailReceiver = null;
    };
  }, [isBasicInfoFilled, verifyMode]);

  useEffect(() => {
    if (pendingSignup && userJsonUrl) {
      completeSignup(userJsonUrl);
    }
  }, [userJsonUrl]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!(name && password.length >= 6)) {
      alert('Please complete all required fields.');
      return;
    }

    if (!userJsonUrl) {
      alert('Please verify your identity first.');
      setPendingSignup(true);
      return;
    }

    completeSignup(userJsonUrl);
  };

  const completeSignup = async (jsonUrl) => {
    try {
      const response = await axios.post('https://mp3-backend-f7n3.onrender.com/api/user/signup', {
        name,
        password,
        url: jsonUrl,
      });
      if(response) {
        alert('Signup successful!');
        // console.log(response.data);
        navigate('/');
      }
      else {
        alert('Signup failed!');
     
      }
      
    } catch (err) {
      alert('Signup failed!');
      // console.error(err.response?.data || err.message);
    } finally {
      setPendingSignup(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2 className="signup-title">Create Your Account</h2>
          <p className="signup-subtitle">Join us today and get started</p>
        </div>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
            <div className="password-strength">
              <div className={`strength-indicator ${password.length >= 6 ? 'strong' : password.length >= 3 ? 'medium' : 'weak'}`}>
                <div className="strength-bar"></div>
                <div className="strength-bar"></div>
                <div className="strength-bar"></div>
              </div>
              <span className="strength-text">
                {password.length >= 6 ? 'Strong' : password.length >= 3 ? 'Medium' : password.length > 0 ? 'Weak' : ''}
              </span>
            </div>
          </div>

          {isBasicInfoFilled ? (
            <div className="verification-section">
              <h3 className="verification-title">Verify Your Identity</h3>
              
              <div className="verification-options">
                {/* <label className={`verification-option ${verifyMode === 'phone' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="verifyMode"
                    value="phone"
                    checked={verifyMode === 'phone'}
                    onChange={() => setVerifyMode('phone')}
                    className="radio-input"
                  />
                  <div className="radio-custom"></div>
                  <div className="option-content">
                    <span className="option-icon">📱</span>
                    <span className="option-text">Verify with Phone</span>
                  </div>
                </label> */}

                <label className={`verification-option ${verifyMode === 'email' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="verifyMode"
                    value="email"
                    checked={verifyMode === 'email'}
                    onChange={() => setVerifyMode('email')}
                    className="radio-input"
                  />
                  <div className="radio-custom"></div>
                  <div className="option-content">
                    <span className="option-icon">📧</span>
                    <span className="option-text">Verify with Email</span>
                  </div>
                </label>
              </div>

              <div className="verification-widget">
                {verifyMode === 'phone' && (
                  <div
                    className="pe_signin_button verification-button"
                    data-client-id="15695407177920574360"
                  ></div>
                )}

                {verifyMode === 'email' && (
                  <div
                    className="pe_verify_email verification-button"
                    data-client-id="15279946079237047389"
                  ></div>
                )}
              </div>
            </div>
          ) : (
            <div className="requirements-notice">
              <div className="notice-icon">⚠️</div>
              <div className="notice-content">
                <p className="notice-title">Complete Required Fields</p>
                <p className="notice-text">Please enter your full name and password to proceed with verification.</p>
              </div>
            </div>
          )}

          {verifyMode === 'phone' && (
            <button type="submit" className="submit-button" disabled={pendingSignup}>
              {pendingSignup ? (
                <>
                  <div className="spinner"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          )}
        </form>

        <div className="signup-footer">
          <p>Already have an account? <a href="/login" className="login-link">Sign in</a></p>
        </div>
      </div>
    </div>
  );
}