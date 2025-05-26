import React from 'react';

const Sidebar = ({ setCurrentSection }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button onClick={() => setCurrentSection('dashboard')}>Dashboard</button>
        </li>
        <li>
          <button onClick={() => setCurrentSection('subscriptions')}>Subscriptions</button>
        </li>
        <li>
          <button onClick={() => setCurrentSection('budget')}>Budget</button>
        </li>
        <li>
          <button onClick={() => setCurrentSection('usage')}>Usage</button>
        </li>
        <li>
          <button onClick={() => setCurrentSection('settings')}>Settings</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;