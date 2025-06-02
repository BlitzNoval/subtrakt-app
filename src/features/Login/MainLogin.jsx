import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import LoginFormContent from './LoginFormContent.jsx';
import '../../styles/Login/Login.css';

const MainLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // Start with Sign Up
  const [loading, setLoading] = useState(false);

  const handleSuccessfulAuth = (userData) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage
      localStorage.setItem('userToken', userData.token);
      localStorage.setItem('userEmail', userData.email);
      if (userData.name) {
        localStorage.setItem('userName', userData.name);
      }
      
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('userToken', 'google-token-' + Date.now());
      localStorage.setItem('userEmail', 'user@gmail.com');
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="login-page">
      {/* Animated Background - Left Side */}
      <AnimatedBackground />

      {/* Login Form - Right Side */}
      <div className="right-section">
        <div className="login-container">
          <LoginFormContent
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            loading={loading}
            onSubmit={handleSuccessfulAuth}
            onGoogleSignIn={handleGoogleSignIn}
          />
        </div>
      </div>
    </div>
  );
};

export default MainLogin;