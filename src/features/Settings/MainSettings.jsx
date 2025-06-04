import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountSection from './AccountSection';
import '../../styles/Settings/Settings.css';
import '../../styles/Settings/DarkModeOverrides.css';
import '../../styles/Accessibility/Accessibility.css';
import '../../styles/Accessibility/MDark.css';
import '../../styles/Accessibility/MDyslexia.css';
import '../../styles/Accessibility/MLargeText.css';
import '../../styles/Accessibility/MColorBlind.css';
import '../../styles/Global/LoadingStates.css';

const MainSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem('darkMode') === 'true',
    dyslexiaMode: localStorage.getItem('dyslexiaMode') === 'true',
    colorBlindMode: localStorage.getItem('colorBlindMode') === 'true',
    largeTextMode: localStorage.getItem('largeTextMode') === 'true',
    showTotals: localStorage.getItem('showTotals') !== 'false'
  });

  // Load accessibility preferences from persistent storage
  // Maintains user preferences across browser sessions

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userToken') !== null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  // Simulate loading when component mounts
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
      setLoading(false);
    };
    loadSettings();
  }, []); 
  // Apply accessibility modes to document body classes
  // Real-time DOM manipulation for immediate visual feedback

  // Apply accessibility modes to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', settings.darkMode);
    document.body.classList.toggle('dyslexia-mode', settings.dyslexiaMode);
    document.body.classList.toggle('colorblind-mode', settings.colorBlindMode);
    document.body.classList.toggle('large-text-mode', settings.largeTextMode);
  }, [settings]);

  // Animate setting changes for user feedback
  // Provides visual confirmation of preference updates

  const handleSettingChange = async (setting, value) => {
    const settingCard = document.querySelector(`[data-setting="${setting}"]`);
    if (settingCard) settingCard.classList.add('updating');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSettings(prev => ({ ...prev, [setting]: value }));
    localStorage.setItem(setting, value);
    
    if (settingCard) settingCard.classList.remove('updating');
  };

  const handleLogout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserEmail('');
    setLoading(false);
    
    navigate('/login');
  };

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

      <AccountSection
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        settings={settings}
        onSettingChange={handleSettingChange}
        onLogout={handleLogout}
        navigate={navigate}
      />
    </div>
  );
};

export default MainSettings;