import React from 'react';

const AccessibilityCard = ({ setting, isEnabled, onToggle }) => {
  return (
    <div 
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
          checked={isEnabled}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default AccessibilityCard;