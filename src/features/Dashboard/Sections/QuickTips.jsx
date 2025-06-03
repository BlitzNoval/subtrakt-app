import React from 'react';
import '../../../styles/Dashboard/DashboardQuickTips.css';

const QuickTips = ({ navigate }) => {
  return (
    <div className="quick-tips">
      <div className="tips-header">Quick Tips</div>
      <img 
            src="/images/Light.png" 
            alt="Notifications" 
            className="tips-icon"
          />
      <div className="tips-text">
        Spotting subscriptions you rarely use?<br />
        Consider pausing or cancelling them!<br />
        Future you will thank you.
      </div>
      <button className="tips-button" onClick={() => navigate('/usage')}>
        VIEW USAGE INSIGHTS →
      </button>
    </div>
  );
};

export default QuickTips;