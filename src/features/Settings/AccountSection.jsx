import React, { useState, useEffect } from 'react';
import { useSubscriptions } from '../../context/SubscriptionContext';
import AccessibilityCard from './Accessibility/AccessibilityCard';
import '../../styles/Settings/About.css';
import '../../styles/Settings/Account.css';
import '../../styles/Settings/Toggle.css';
import '../../styles/Accessibility/AccessibilityLayout.css';

const AccountSection = ({ isLoggedIn, userEmail, settings, onSettingChange, onLogout, navigate }) => {
  const { resetSubscriptions, loadMockData } = useSubscriptions();
  const [feedback, setFeedback] = useState({ message: '', visible: false });

  const showFeedback = (message) => {
    setFeedback({ message, visible: true });
    setTimeout(() => setFeedback({ message: '', visible: false }), 3000);
  };

  const handleReset = () => {
    resetSubscriptions();
    showFeedback('Data reset successfully');
  };

  const handleLoadMockData = () => {
    loadMockData();
    showFeedback('Mock data loaded');
  };

  const accessibilitySettings = [
    {
      id: 'darkMode',
      title: 'Dark Mode',
      description: 'Reduce eye strain with a dark color scheme',
      icon: '/images/Dark.png',
    },
    {
      id: 'dyslexiaMode',
      title: 'Dyslexia-Friendly',
      description: 'Use specialized fonts and spacing for easier reading',
      icon: '/images/dyslexia.png',
    },
    {
      id: 'colorBlindMode',
      title: 'Color Blind Mode',
      description: 'Adjust colors for better visibility and contrast',
      icon: '/images/ColorBlind.png',
    },
    {
      id: 'largeTextMode',
      title: 'Large Text Mode',
      description: 'Increase text size throughout the application',
      icon: '/images/LargeText.png',
    },
  ];

  return (
    <div className="settings-grid">
      {/* Account Card */}
      <div className="settings-card account-card">
        <h3>Account</h3>
        {isLoggedIn ? (
          <div className="account-info">
            <div className="user-avatar">{userEmail.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <p className="user-email">{userEmail}</p>
              <button className="logout-btn" onClick={onLogout}>
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
        <h2>Accessibility Options</h2>
        <p className="section-description">
          Customize the app to better suit your visual and reading needs
        </p>
        <div className="accessibility-grid">
          {accessibilitySettings.map(setting => (
            <AccessibilityCard
              key={setting.id}
              setting={{
                ...setting,
                icon: (
                  <img
                    src={setting.icon}
                    alt={`${setting.title} icon`}
                    className="accessibility-icon"
                  />
                ),
              }}
              isEnabled={settings[setting.id]}
              onToggle={value => onSettingChange(setting.id, value)}
            />
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
              onChange={e => onSettingChange('showTotals', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="preference-item dev-settings">
               <h4>Development Options</h4>
          <div>
       
        
          </div>
          <div className="dev-buttons">
            <button 
              onClick={handleReset}
              className="reset-button reset-data"
            >
              Reset All Data
            </button>
            <button 
              onClick={handleLoadMockData}
              className="reset-button load-sample"
            >
              Load Mock Data
              
            </button>
            
          </div>
          <p className={`feedback-message ${feedback.visible ? '' : 'hidden'}`}>
            {feedback.message}
          </p>
   
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
            <p>
              <img 
                src="/images/Star.png" 
                alt="Notifications" 
                className="about-icon"
                style={{ width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '0.5em' }}
              />
              Subscription management made sub-stantially easy - stress-free and simple.
            </p>
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
  );
};

export default AccountSection;