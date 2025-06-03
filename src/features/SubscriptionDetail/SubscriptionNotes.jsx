import React from 'react';
import '../../styles/SubscriptionDetails/UsageDetails.css';
import '../../styles/SubscriptionDetails/ActionDetails.css';

const SubscriptionNotes = ({ subscription }) => {
  // Calculate analytics
  const monthlyHours = subscription.usageHours ? 
    (subscription.usageFrequency === 'daily' ? parseInt(subscription.usageHours) * 30 :
     subscription.usageFrequency === 'weekly' ? parseInt(subscription.usageHours) * 4 :
     parseInt(subscription.usageHours)) : 0;
  
  const daysUntilRenewal = subscription.renewalDate ? 
    Math.ceil((new Date(subscription.renewalDate) - new Date()) / (1000 * 60 * 60 * 24)) : null;
  
  const subscriptionAge = subscription.dateAdded ? 
    Math.floor((new Date() - new Date(subscription.dateAdded)) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <>
      {subscription.usageHours && (
        <div className="usage-stats-section">
          <h3>Usage Statistics</h3>
          <div className="usage-grid">
            <div className="usage-stat">
              <span className="stat-icon">⏱️</span>
              <div className="stat-content">
                <span className="stat-value">{subscription.usageHours} hrs</span>
                <span className="stat-label">per {subscription.usageFrequency || 'week'}</span>
              </div>
            </div>
            <div className="usage-stat">
              <span className="stat-icon">📊</span>
              <div className="stat-content">
                <span className="stat-value">{monthlyHours} hrs</span>
                <span className="stat-label">monthly total</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="details-section">
        <h3>Subscription Details</h3>
        <div className="details-grid">
          {subscription.renewalDate && (
            <div className="detail-item">
              <span className="detail-label">Next Renewal</span>
              <span className="detail-value">
                {new Date(subscription.renewalDate).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
                {daysUntilRenewal && (
                  <span className="days-badge">
                    {daysUntilRenewal > 0 ? `in ${daysUntilRenewal} days` : 'Renewal due!'}
                  </span>
                )}
              </span>
            </div>
          )}
          
          {subscription.trialEndDate && (
            <div className="detail-item">
              <span className="detail-label">Trial Ends</span>
              <span className="detail-value">
                {new Date(subscription.trialEndDate).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
          )}
          
          <div className="detail-item">
            <span className="detail-label">Added On</span>
            <span className="detail-value">
              {subscription.dateAdded 
                ? new Date(subscription.dateAdded).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })
                : 'Unknown'}
              {subscriptionAge > 0 && (
                <span className="days-badge">{subscriptionAge} days ago</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {subscription.notes && (
        <div className="notes-section">
          <h3>Notes</h3>
          <p className="notes-content">{subscription.notes}</p>
        </div>
      )}
    </>
  );
};

export default SubscriptionNotes;