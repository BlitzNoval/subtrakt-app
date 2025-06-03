import React from 'react';
import SubscriptionDetails from './SubscriptionNotes';
import { getCategoryColor } from '../../utils/CategoryColors';
import '../../styles/SubscriptionDetails/PricingDetails.css';
import '../../styles/SubscriptionDetails/RelatedServicesDetails.css';

const SubscriptionInfo = ({ subscription, getSubscriptionLogo }) => {
  const monthlyPrice = parseFloat(subscription.price?.replace(/[^\d.]/g, '') || 0);
  const analytics = {
    yearlyPrice: monthlyPrice * 12,
    dailyPrice: monthlyPrice / 30
  };

  const getImportanceColor = (importance) => {
    const colors = { 'Critical': '#2563eb', 'Regular': '#f59e0b', 'Optional': '#ef4444' };
    return colors[importance] || '#6b7280';
  };

  return (
    <div className="service-card">
      <div className="service-header">
        <img
          src={getSubscriptionLogo(subscription)}
          alt={subscription.name}
          className="service-logo-large"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(subscription.name)}&background=74b9ff&color=fff&size=80`;
          }}
        />
        <div className="service-title">
          <h1>{subscription.name}</h1>
          <div className="service-meta">
            <span className="category-badge" style={{ backgroundColor: getCategoryColor(subscription.category) }}>
              {subscription.category}
            </span>
            <span className="importance-badge" style={{ 
              backgroundColor: `${getImportanceColor(subscription.importance)}20`,
              color: getImportanceColor(subscription.importance),
              border: `1px solid ${getImportanceColor(subscription.importance)}`
            }}>
              {subscription.importance}
            </span>
            {subscription.isTrial && <span className="trial-badge">Free Trial</span>}
          </div>
        </div>
      </div>

      <div className="pricing-section">
        <div className="price-main">
          <span className="price-amount">{subscription.price}</span>
          <span className="price-period">/{subscription.billingCycle || 'month'}</span>
        </div>
        <div className="price-breakdown">
          <div className="price-item">
            <span className="price-label">Daily</span>
            <span className="price-value">R{analytics.dailyPrice.toFixed(2)}</span>
          </div>
          <div className="price-item">
            <span className="price-label">Yearly</span>
            <span className="price-value">R{analytics.yearlyPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <SubscriptionDetails subscription={subscription} />
    </div>
  );
};

export default SubscriptionInfo;
