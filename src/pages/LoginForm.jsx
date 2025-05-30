import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // Start with Sign Up
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Generate falling "minus" shaped rectangles
// Update the generateSquares function to create horizontal rectangles
const generateSquares = () => {
  const squares = [];
  for (let i = 0; i < 20; i++) {
    squares.push({
      id: i,
      width: Math.random() * 100 + 100,  // Width: 40-120px
      height: Math.random() *  20 + 20,   // Height: 2-7px (thin)
      left: Math.random() * 80,
      delay: Math.random() * 10,
      duration: Math.random() * 4 + 4
    });
  }
  return squares;
};




  const [squares] = useState(generateSquares());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Sign up specific validations
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage (in real app, this would come from backend)
      localStorage.setItem('userToken', 'mock-token-' + Date.now());
      localStorage.setItem('userEmail', formData.email);
      if (!isLogin) {
        localStorage.setItem('userName', formData.name);
      }
      
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    // Simulate Google sign in
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('userToken', 'google-token-' + Date.now());
      localStorage.setItem('userEmail', 'user@gmail.com');
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="login-page">
      {/* Animated Background - Left Side */}
      <div className="left-section">
        <div className="animated-background">
          {squares.map(square => (
            <div
                key={square.id}
                className="falling-square"
                style={{
                    width: `${square.width}px`,
                    height: `${square.height}px`,
                    left: `${square.left}%`,
                    animationDelay: `${square.delay}s`,
                    animationDuration: `${square.duration}s`
                }}
                />
          ))}
        </div>
        <div className="brand-section">
          <h1 className="brand-logo">Subtrakt</h1>
        </div>
      </div>

      {/* Login Form - Right Side */}
      <div className="right-section">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h2>{isLogin ? 'Login' : 'Sign Up'} or {isLogin ? 'Sign Up' : 'Login In'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              )}

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  isLogin ? 'Login' : 'Sign Up'
                )}
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              <button type="button" className="google-button" onClick={handleGoogleSignIn} disabled={loading}>
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </form>

            <div className="login-footer">
              <p>
                {isLogin ? "Already have an account?" : "Don't have an account?"}
                <button className="toggle-button" onClick={toggleMode}>
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;