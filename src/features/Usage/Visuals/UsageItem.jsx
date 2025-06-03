import React from 'react';
import { getCategoryIconColor } from '../../../utils/CategoryColors';

const UsageItem = ({ subscription, monthlyHours, valueScore, getSubscriptionLogo }) => {
  const getServiceInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
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
          backgroundColor: getCategoryIconColor(subscription.category),
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
