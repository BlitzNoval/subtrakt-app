import React from 'react';
import '../../styles/Dashboard/DashboardMetrics.css';

const DashboardMetrics = ({ 
  userName, 
  activeSubscriptions, 
  totalMonthlySpent, 
  newSubscriptionsThisMonth, 
  freeTrialsActive 
}) => {
  return (
    <>
      {/* Welcome Message */}
      <div className="welcome-message">
        <h2 className="welcome-text">
          Hey {userName}, welcome<br />
          back hope you're<br />
          having a great day!
        </h2>
      </div>
      
      {/* Metrics Grid - 2x2 Layout */}
      <div className="metrics-grid">
        {/* Active Subscriptions */}
        <div className="metric-card active-subs">
          <div className="metric-number">{activeSubscriptions}</div>
          <div className="metric-label">
            Total Active Subscriptions
          </div>
        </div>

        {/* Total Spent */}
        <div className="metric-card total-spent">
          <div className="metric-number">R{totalMonthlySpent.toFixed(0)}</div>
          <div className="metric-label">Total Spent<br />This Month</div>
        </div>

        {/* New Subscriptions */}
        <div className="metric-card new-subs">
          <div className="metric-number">{newSubscriptionsThisMonth}</div>
          <div className="metric-label">
            New Subscriptions<br />
            This Month
          </div>
        </div>

        {/* Free Trials */}
        <div className="metric-card free-trials">
          <div className="metric-number">{freeTrialsActive}</div>
          <div className="metric-label">
            Free Trials Signed<br />
            Up For This Month
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMetrics;