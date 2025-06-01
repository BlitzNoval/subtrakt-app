import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';
import '../styles/DarkMode.css';
import '../styles/Accessibility.css';
import '../styles/LoadingStates.css';

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem('darkMode') === 'true',
    dyslexiaMode: localStorage.getItem('dyslexiaMode') === 'true',
    colorBlindMode: localStorage.getItem('colorBlindMode') === 'true',
    largeTextMode: localStorage.getItem('largeTextMode') === 'true',
    showTotals: localStorage.getItem('showTotals') !== 'false'
  });

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userToken') !== null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  // Simulate loading when component mounts
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      // Simulate API call to fetch user settings
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
      setLoading(false);
    };
    
    loadSettings();
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Apply dyslexia mode
    if (settings.dyslexiaMode) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }

    // Apply color blind mode
    if (settings.colorBlindMode) {
      document.body.classList.add('colorblind-mode');
    } else {
      document.body.classList.remove('colorblind-mode');
    }

    // Apply large text mode
    if (settings.largeTextMode) {
      document.body.classList.add('large-text-mode');
    } else {
      document.body.classList.remove('large-text-mode');
    }
  }, [settings]);

  const handleSettingChange = async (setting, value) => {
    // Show loading for individual setting
    const settingCard = document.querySelector(`[data-setting="${setting}"]`);
    if (settingCard) settingCard.classList.add('updating');
    
    // Simulate API call to save setting
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSettings(prev => ({ ...prev, [setting]: value }));
    localStorage.setItem(setting, value);
    
    if (settingCard) settingCard.classList.remove('updating');
  };

  const handleLogout = async () => {
    setLoading(true);
    // Simulate logout API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserEmail('');
    setLoading(false);
    
    // Redirect to login page
    navigate('/login');
  };

  const accessibilitySettings = [
    {
      id: 'darkMode',
      title: 'Dark Mode',
      description: 'Reduce eye strain with a dark color scheme',
      icon: '🌙'
    },
    {
      id: 'dyslexiaMode',
      title: 'Dyslexia-Friendly Mode',
      description: 'Use specialized fonts and spacing for easier reading',
      icon: '📖'
    },
    {
      id: 'colorBlindMode',
      title: 'Color Blind Mode',
      description: 'Adjust colors for better visibility and contrast',
      icon: '🎨'
    },
    {
      id: 'largeTextMode',
      title: 'Large Text Mode',
      description: 'Increase text size throughout the application',
      icon: '🔍'
    }
  ];

  if (loading) {
    return (
      <div className="settings-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your preferences and accessibility options</p>
      </div>

      <div className="settings-grid">
        {/* Account Card */}
        <div className="settings-card account-card">
          <h3>Account</h3>
          {isLoggedIn ? (
            <div className="account-info">
              <div className="user-avatar">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <p className="user-email">{userEmail}</p>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="login-prompt">
              <p>Sign in to sync your data</p>
              <button className="login-btn" onClick={() => navigate('/login')}>
                Login / Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Accessibility Settings Section */}
        <div className="settings-section accessibility-section">
          <h2>
            <span className="section-icon">♿</span>
            Accessibility Options
          </h2>
          <p className="section-description">
            Customize the app to better suit your visual and reading needs
          </p>
          
          <div className="accessibility-grid">
            {accessibilitySettings.map(setting => (
              <div 
                key={setting.id} 
                className="settings-card accessibility-card"
                data-setting={setting.id}
              >
                <div className="setting-header">
                  <div className="setting-icon">{setting.icon}</div>
                  <h3>{setting.title}</h3>
                </div>
                <p>{setting.description}</p>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings[setting.id]}
                    onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Display Preferences */}
        <div className="settings-card">
          <h3>Display Preferences</h3>
          <div className="preference-item">
            <div>
              <h4>Show Totals in Headers</h4>
              <p>Display total amounts in page headers</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.showTotals}
                onChange={(e) => handleSettingChange('showTotals', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* About Card */}
        <div className="settings-card about-card">
          <h3>About</h3>
          <div className="about-content">
            <div className="app-version">
              <strong>Subtrakt</strong>
              <span>Version 1.0.0</span>
            </div>
            <div className="accessibility-info">
              <p>🌟 Committed to making subscription management accessible for everyone</p>
            </div>
            <div className="about-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#support">Support</a>
              <a href="#accessibility">Accessibility Statement</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;