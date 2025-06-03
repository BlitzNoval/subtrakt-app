import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-nav">
      <span
        className={activeTab === 'basic' ? 'active-tab' : ''}
        onClick={() => setActiveTab('basic')}
      >
        Basic Info
      </span>
      <span
        className={activeTab === 'details' ? 'active-tab' : ''}
        onClick={() => setActiveTab('details')}
      >
        Details & Usage
      </span>
    </div>
  );
};

export default TabNavigation;