import React from 'react';

const UsageItem = ({ subscription, monthlyHours, valueScore, getSubscriptionLogo }) => {
  const getServiceInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Entertainment': '#1f77b4',
      'Software': '#ff6b6b',
      'Gaming': '#9b59b6',
      'Health & Fitness': '#1abc9c',
      'Other': '#95a5a6'
    };
    return colors[category] || '#3498db';
  };

  return (
    <div className="usage-item">
      <div className="usage-icon" style={{ background: 'transparent', padding: '0' }}>
        <img
          src={getSubscriptionLogo(subscription)}
          alt={subscription.name}
          style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div style={{
          display: 'none',
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          backgroundColor: getCategoryColor(subscription.category),
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          {getServiceInitials(subscription.name)}
        </div>
      </div>
      <div className="usage-details">
        <h4>{subscription.name}</h4>
        <span className="usage-category">{subscription.category}</span>
      </div>
      <div className="usage-stats">
        <div className="stat">
          <span className="stat-label">Usage</span>
          <span className="stat-value">{monthlyHours.toFixed(0)} hrs/mo</span>
        </div>
        <div className="stat">
          <span className="stat-label">Value</span>
          <span className="stat-value">{valueScore} hrs/R10</span>
        </div>
      </div>
    </div>
  );
};

export default UsageItem;