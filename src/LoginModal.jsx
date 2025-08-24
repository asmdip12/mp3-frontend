import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [loginWith, setLoginWith] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [phoneno, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://mp3-backend-f7n3.onrender.com/api/user/login',
        { email, phoneno, password },
        { withCredentials: true }
      );
      alert('Login successful!');
      login(response.data.user);
      navigate('/TreeForm');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexWrap: 'wrap', // ✅ allow wrapping on smaller screens
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '1rem' // ✅ spacing for mobile
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
          radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)
        `,
          zIndex: 1
        }}
      ></div>

      {/* Left Side - Branding */}
      <div
        style={{
          flex: 1,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          maxWidth: '500px',
          zIndex: 2,
          minWidth: '280px', // ✅ shrink safely
          width: '100%', // ✅ full width on mobile
          textAlign: 'left',
          marginTop: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginRight: '12px',
              backdropFilter: 'blur(10px)'
            }}
          >
            🌱
          </div>
          <div>
            <h1
              style={{
                color: 'white',
                fontSize: '22px',
                fontWeight: '700',
                margin: 0,
                lineHeight: 1.2
              }}
            >
              Mission<br />Parivartan
            </h1>
          </div>
        </div>

        <h2
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '32px', // ✅ smaller for mobile
            fontWeight: '300',
            margin: 0,
            marginBottom: '1rem',
            lineHeight: 1.2
          }}
        >
          Welcome Back
        </h2>

        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '16px',
            margin: 0,
            lineHeight: 1.5
          }}
        >
          Continue your journey with us. Sign in to access your account and
          explore new possibilities.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div
        style={{
          flex: 1,
          maxWidth: '480px',
          margin: '1rem',
          zIndex: 2,
          minWidth: '280px', // ✅ fits smaller screens
          width: '100%' // ✅ full width on mobile
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
          }}
        >
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1a1a1a',
              margin: 0,
              marginBottom: '0.5rem'
            }}>
              Sign In
            </h3>
            <p style={{
              color: '#666',
              fontSize: '16px',
              margin: 0
            }}>
              Choose your preferred sign in method
            </p>
          </div>
          
          {/* Toggle Options */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '2rem'
          }}>
            <label style={{
              flex: 1,
              padding: '16px',
              border: loginWith === 'email' ? '2px solid #667eea' : '2px solid #e5e7eb',
              borderRadius: '12px',
              background: loginWith === 'email' ? 'rgba(102, 126, 234, 0.05)' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
              
            }}>
              <input
                type="radio"
                value="email"
                checked={loginWith === 'email'}
                onChange={() => setLoginWith('email')}
                style={{ display: 'none' }}
                
              />
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '2px solid #667eea',
                background: loginWith === 'email' ? '#667eea' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {loginWith === 'email' && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'white'
                  }}></div>
                )}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: loginWith === 'email' ? '#667eea' : '#666'
              }}>
                📧 Email
              </span>
            </label>
            
            {/* <label style={{
              flex: 1,
              padding: '16px',
              border: loginWith === 'phone' ? '2px solid #667eea' : '2px solid #e5e7eb',
              borderRadius: '12px',
              background: loginWith === 'phone' ? 'rgba(102, 126, 234, 0.05)' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <input
                type="radio"
                value="phone"
                checked={loginWith === 'phone'}
                onChange={() => setLoginWith('phone')}
                style={{ display: 'none' }}
              />
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '2px solid #667eea',
                background: loginWith === 'phone' ? '#667eea' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {loginWith === 'phone' && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'white'
                  }}></div>
                )}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: loginWith === 'phone' ? '#667eea' : '#666'
              }}>
                📱 Phone
              </span>
            </label> */}
          </div>

          {/* Form */}
          <div onSubmit={handleLogin}>
            {/* Email or Phone Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                {loginWith === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              {loginWith === 'email' ? (
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    background: 'white',
                    transition: 'border-color 0.2s ease',
                    outline: 'none',
                    color:'black'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              ) : (
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneno}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    background: 'white',
                    transition: 'border-color 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'white',
                  transition: 'border-color 0.2s ease',
                  outline: 'none',
                  color:'black'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <button 
              type="submit" 
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                marginBottom: '1rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 25px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Sign In
            </button>
            
            <div style={{
              textAlign: 'center',
              position: 'relative',
              marginBottom: '1rem'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                background: '#e5e7eb',
                zIndex: 1
              }}></div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  

