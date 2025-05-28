import React from 'react';

const MetricsSidebar = ({ 
  totalMonthlySpent, 
  activeSubscriptions, 
  freeTrials 
}) => (
  <div className="metrics-sidebar">
    <div className="metric-card total-cost">
      <div className="metric-label">Total Monthly Cost</div>
      <div className="metric-value">R{totalMonthlySpent.toFixed(2)}</div>
    </div>

    <div className="metric-card active-count">
      <div className="metric-label">Active Subscriptions</div>
      <div className="metric-value">{activeSubscriptions}</div>
    </div>

    <div className="metric-card trials-count">
      <div className="metric-label">Free Trials</div>
      <div className="metric-value">{freeTrials}</div>
    </div>
  </div>
);

export default MetricsSidebar;