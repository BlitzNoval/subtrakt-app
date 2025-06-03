import React from 'react';
import '../../../styles/Subscriptions/SubsMetrics.css';

const MetricsCards = ({ subscriptions }) => {
  // Calculate metrics
  const totalMonthlySpent = subscriptions.reduce((total, sub) => {
    const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
    return total + price;
  }, 0);

  const activeSubscriptions = subscriptions.filter(sub => !sub.isTrial).length;
  const freeTrials = subscriptions.filter(sub => sub.isTrial).length;

  return (
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
};

export default MetricsCards;