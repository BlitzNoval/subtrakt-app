import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';
import '../styles/DarkMode.css';

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem('darkMode') === 'true',
    compactView: localStorage.getItem('compactView') === 'true',
    showTotals: localStorage.getItem('showTotals') !== 'false',
    autoSort: localStorage.getItem('autoSort') === 'true',
    colorCodeCategories: localStorage.getItem('colorCodeCategories') !== 'false'
  });

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userToken') !== null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  useEffect(() => {
    // Apply dark mode class to body
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [settings.darkMode]);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    localStorage.setItem(setting, value);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  const settingsData = [
    {
      id: 'darkMode',
      title: 'Dark Mode',
      description: 'Switch between light and dark themes',
      type: 'toggle'
    },
    {
      id: 'compactView',
      title: 'Compact View',
      description: 'Show more items with less spacing',
      type: 'toggle'
    },
    {
      id: 'showTotals',
      title: 'Show Totals',
      description: 'Display total amounts in headers',
      type: 'toggle'
    },
    {
      id: 'autoSort',
      title: 'Auto Sort by Price',
      description: 'Automatically sort subscriptions by highest cost',
      type: 'toggle'
    },
    {
      id: 'colorCodeCategories',
      title: 'Color Code Categories',
      description: 'Use colors to distinguish between categories',
      type: 'toggle'
    }
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your preferences</p>
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

        {/* Display Settings */}
        {settingsData.slice(0, 3).map(setting => (
          <div key={setting.id} className="settings-card">
            <h3>{setting.title}</h3>
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

        {/* Organization Settings */}
        {settingsData.slice(3, 5).map(setting => (
          <div key={setting.id} className="settings-card">
            <h3>{setting.title}</h3>
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

        {/* About Card */}
        <div className="settings-card about-card">
          <h3>About</h3>
          <div className="about-content">
            <div className="app-version">
              <strong>Subtrakt</strong>
              <span>Version 1.0.0</span>
            </div>
            <div className="about-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#support">Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;