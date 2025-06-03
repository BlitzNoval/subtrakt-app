import React from 'react';

const QuickActions = ({ subscription, navigate }) => {
  const handleCancelSearch = () => {
    window.open(
      `https://www.google.com/search?q=how+to+cancel+${encodeURIComponent(subscription.name)}+subscription`, 
      '_blank'
    );
  };

  return (
    <div className="quick-actions-card">
      <h3>Quick Actions</h3>
      <div className="actions-list">
        <button className="action-item" onClick={() => navigate('/budget')}>
          <span className="action-icon">📊</span>
          <span>View in Budget</span>
        </button>
        <button className="action-item" onClick={() => navigate('/usage')}>
          <span className="action-icon">⏱️</span>
          <span>Check Usage Insights</span>
        </button>
        <button className="action-item cancel" onClick={handleCancelSearch}>
          <span className="action-icon">🔍</span>
          <span>How to Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;