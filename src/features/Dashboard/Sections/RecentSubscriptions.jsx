import React from 'react';
import '../../../styles/Dashboard/DashboardRecent.css';

const RecentSubscriptions = ({ subscriptions, getSubscriptionLogo, navigate }) => {
  // Get service initials for fallback
  const getServiceInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Entertainment': '#1f77b4',
      'Software': '#ff6b6b',
      'Gaming': '#9b59b6',
      'Health & Fitness': '#1abc9c'
    };
    return colors[category] || '#58cc02';
  };

  // Get tag color
  const getTagColor = (category) => {
    const colors = {
      'Entertainment': '#e17055',
      'Software': '#f39c12',
      'Gaming': '#fd79a8',
      'Health & Fitness': '#55efc4'
    };
    return colors[category] || '#74b9ff';
  };

  // Get recent subscriptions (last 4 added)
  const recentSubscriptions = [...subscriptions]
    .sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0))
    .slice(0, 4);

  return (
    <div className="recent-subscriptions">
      <div className="section-header">Recent Subscriptions</div>
      <div className="subscriptions-grid">
        {recentSubscriptions.length > 0 ? (
          recentSubscriptions.map((sub) => (
            <div key={sub.id} className="subscription-item">
              <div className="subscription-info">
                <div className="subscription-icon" style={{ background: 'transparent', padding: '0' }}>
                  <img
                    src={getSubscriptionLogo(sub)}
                    alt={sub.name}
                    style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{
                    display: 'none',
                    width: '28px',
                    height: '28px',
                    borderRadius: '4px',
                    background: getCategoryColor(sub.category),
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '10px'
                  }}>
                    {getServiceInitials(sub.name)}
                  </div>
                </div>
                <div className="subscription-details">
                  <h4>{sub.name}</h4>
                  <span className="subscription-tag" style={{ backgroundColor: getTagColor(sub.category) }}>
                    {sub.category}
                  </span>
                </div>
              </div>
              <div className="subscription-price">
                <div className="amount">{sub.price}/{sub.billingCycle === 'yearly' ? 'yr' : 'mo'}</div>
                <div className="period">
                  {sub.isTrial ? 'Free Trial' : 
                   sub.renewalDate ? `Renews ${new Date(sub.renewalDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}` : 
                   sub.billingCycle || 'Monthly'}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d' }}>
            <p>No subscriptions yet. Add your first subscription to get started!</p>
          </div>
        )}
      </div>
      <button className="view-more green" onClick={() => navigate('/subscriptions')}>
        VIEW MORE →
      </button>
    </div>
  );
};

export default RecentSubscriptions;