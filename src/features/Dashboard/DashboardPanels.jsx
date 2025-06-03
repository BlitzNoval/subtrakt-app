import React from 'react';
import '../../styles/Dashboard/DashboardPanels.css';
import { getCategoryColor, getCategoryIconColor } from '../../utils/CategoryColors';

const DashboardPanels = ({ subscriptions, getSubscriptionLogo, navigate }) => {
  const getServiceInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const trialsEndingSoon = subscriptions.filter(sub => {
    if (!sub.isTrial || !sub.trialEndDate) return false;
    const daysUntilEnd = Math.ceil((new Date(sub.trialEndDate) - new Date()) / (1000 * 60 * 60 * 24));
    return daysUntilEnd <= 7 && daysUntilEnd > 0;
  }).slice(0, 2);

  const cancellationCandidates = subscriptions.filter(sub => {
    const cost = parseFloat(sub.price?.replace(/[^\d.]/g, '') || sub.cost || 0);
    const isHighCost = cost > 200;
    const isRarelyUsed = sub.usageFrequency === 'rarely' || (sub.usageHours && parseInt(sub.usageHours) < 2);
    return isHighCost || isRarelyUsed || sub.importance === 'Optional';
  }).slice(0, 2);

  const renderServiceIcon = (sub) => (
    <div className="notification-icon" style={{ background: 'transparent', padding: '0' }}>
      <img
        src={getSubscriptionLogo(sub)}
        alt={sub.name}
        style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div style={{
        display: 'none',
        width: '32px',
        height: '32px',
        borderRadius: '6px',
        background: getCategoryIconColor(sub.category),
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        {getServiceInitials(sub.name)}
      </div>
    </div>
  );

  return (
    <>
      {/* Recent Notifications */}
      <div className="recent-notifications">
        <div className="panel-header blue">
          Recent Notifications 
          <img 
            src="/images/Notification.png" 
            alt="Notifications" 
            className="panel-header-icon"
          />
        </div>
        <div className="panel-content">
          {trialsEndingSoon.length > 0 ? (
            trialsEndingSoon.map((trial, index) => (
              <div key={index} className="notification-item">
                {renderServiceIcon(trial)}
                <div className="notification-text">
                  <h4>Free Trial Ending Soon</h4>
                  <p>{trial.name} trial ends in {Math.ceil((new Date(trial.trialEndDate) - new Date()) / (1000 * 60 * 60 * 24))} days</p>
                </div>
              </div>
            ))
          ) : (
            <div className="notification-item">
              <div className="notification-icon" style={{ backgroundColor: '#27ae60' }}>✓</div>
              <div className="notification-text">
                <h4>All Good!</h4>
                <p>No urgent notifications</p>
              </div>
            </div>
          )}
          
          {subscriptions.filter(sub => sub.usageFrequency === 'rarely').slice(0, 1).map((sub, index) => (
            <div key={`low-usage-${index}`} className="notification-item">
              {renderServiceIcon(sub)}
              <div className="notification-text">
                <h4>Low Usage Time</h4>
                <p>{sub.name} rarely used</p>
              </div>
            </div>
          ))}
          
          <button className="view-more blue" onClick={() => navigate('/subscriptions')}>
            VIEW MORE →
          </button>
        </div>
      </div>

      {/* Consider Cancelling */}
      <div className="consider-cancelling">
        <div className="panel-header red">
          Consider Cancelling 
          <img 
            src="/images/Warning.png" 
            alt="Notifications" 
            className="panel-header-icon"
          />
        </div>
        <div className="panel-content">
          {cancellationCandidates.length > 0 ? (
            cancellationCandidates.map((sub, index) => (
              <div key={index} className="cancellation-item">
                <div className="service-info">
                  <div className="service-icon" style={{ background: 'transparent', padding: '0' }}>
                    {renderServiceIcon(sub)}
                  </div>
                  <div className="service-details">
                    <h4>{sub.name}</h4>
                    <span className="service-tag" style={{ backgroundColor: getCategoryColor(sub.category) }}>
                      {sub.category}
                    </span>
                  </div>
                </div>
                <div className="service-price">{sub.price}/mo</div>
              </div>
            ))
          ) : (
            <div className="notification-item">
              <div className="notification-icon" style={{ backgroundColor: '#27ae60' }}>✓</div>
              <div className="notification-text">
                <h4>All subscriptions look good!</h4>
                <p>No recommendations at this time</p>
              </div>
            </div>
          )}
          <button className="view-more red" onClick={() => navigate('/subscriptions')}>
            VIEW MORE →
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardPanels;
