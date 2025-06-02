import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscriptions } from '../context/SubscriptionContext';
import '../styles/Dashboard/DashboardHeader.css';
import '../styles/Dashboard/DashboardGrid.css';
import '../styles/Dashboard/DashboardQuickTips.css';
import '../styles/Dashboard/DashboardRecent.css';
import '../styles/Dashboard/DashboardMetrics.css';
import '../styles/Dashboard/DashboardPanels.css';
import '../styles/Dashboard/DBResponsiveness.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    loading,
    activeSubscriptions,
    newSubscriptionsThisMonth,
    freeTrialsActive,
    totalMonthlySpent,
    subscriptions,
    getSubscriptionLogo
  } = useSubscriptions();

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your subscription data...</p>
      </div>
    );
  }

  // Get trial subscriptions ending soon
  const trialsEndingSoon = subscriptions.filter(sub => {
    if (!sub.isTrial || !sub.trialEndDate) return false;
    const daysUntilEnd = Math.ceil((new Date(sub.trialEndDate) - new Date()) / (1000 * 60 * 60 * 24));
    return daysUntilEnd <= 7 && daysUntilEnd > 0;
  }).slice(0, 2);

  // Get subscriptions to consider cancelling (high cost or rarely used)
  const cancellationCandidates = subscriptions.filter(sub => {
    const cost = parseFloat(sub.price?.replace(/[^\d.]/g, '') || sub.cost || 0);
    const isHighCost = cost > 200;
    const isRarelyUsed = sub.usageFrequency === 'rarely' || (sub.usageHours && parseInt(sub.usageHours) < 2);
    return isHighCost || isRarelyUsed || sub.importance === 'Optional';
  }).slice(0, 2);

  // Get recent subscriptions (last 4 added)
  const recentSubscriptions = [...subscriptions]
    .sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0))
    .slice(0, 4);

  // Navigate to subscriptions page
  const handleAddSubscription = () => {
    navigate('/subscriptions');
  };

  // Get service color based on category
  const getCategoryColor = (category) => {
    const colors = {
      'Entertainment': '#1f77b4',
      'Software': '#ff6b6b',
      'Productivity': '#e74c3c',
      'Cloud Storage': '#0077b5',
      'Education': '#27ae60',
      'Finance Tools': '#f39c12',
      'Professional': '#27ae60',
      'Gaming': '#9b59b6',
      'Health & Fitness': '#1abc9c',
      'News & Media': '#e67e22',
      'Business': '#34495e',
      'Developer Tools': '#8e44ad',
      'Car Subscriptions': '#2c3e50',
      'Mobile Data': '#16a085'
    };
    return colors[category] || '#58cc02';
  };

  // Get tag color based on category
  const getTagColor = (category) => {
    const colors = {
      'Entertainment': '#e17055',
      'Software': '#f39c12',
      'Productivity': '#74b9ff',
      'Cloud Storage': '#a29bfe',
      'Education': '#00d2d3',
      'Finance Tools': '#f39c12',
      'Professional': '#27ae60',
      'Gaming': '#fd79a8',
      'Health & Fitness': '#55efc4',
      'News & Media': '#fab1a0',
      'Business': '#636e72',
      'Developer Tools': '#e84393',
      'Car Subscriptions': '#2d3436',
      'Mobile Data': '#00b894'
    };
    return colors[category] || '#74b9ff';
  };

  // Get service initials for fallback
  const getServiceInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="top-header">
        <h1 className="logo">Subtrakt</h1>
        <div className="header-icons">
          <button
            className="icon-button help-button"
            onClick={() => navigate('/settings')}
          >
            ?
          </button>
          <button
            className="icon-button profile-button"
            onClick={() => navigate('/settings')}
          >
            👤
          </button>
        </div>
      </header>
  
      {/* Divider Line */}
      <hr className="header-divider" />

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        
        {/* Welcome Message - Now in the grid */}
        <div className="welcome-message">
          <h2 className="welcome-text">
            Hey Liam, welcome<br />
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
              Active Subscriptions<br />
              Being Tracked
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

        {/* Recent Notifications */}
        <div className="recent-notifications">
          <div className="panel-header blue">
            Recent Notifications 🔔
          </div>
          <div className="panel-content">
            {trialsEndingSoon.length > 0 ? (
              trialsEndingSoon.map((trial, index) => (
                <div key={index} className="notification-item">
                  <div className="notification-icon" style={{ 
                    background: 'transparent',
                    padding: '0'
                  }}>
                    <img
                      src={getSubscriptionLogo(trial)}
                      alt={trial.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      style={{
                        display: 'none',
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        background: '#e74c3c',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                    >
                      {getServiceInitials(trial.name)}
                    </div>
                  </div>
                  <div className="notification-text">
                    <h4>Free Trial Ending Soon</h4>
                    <p>{trial.name} trial ends in {Math.ceil((new Date(trial.trialEndDate) - new Date()) / (1000 * 60 * 60 * 24))} days</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="notification-item">
                <div className="notification-icon" style={{ backgroundColor: '#27ae60' }}>
                  ✓
                </div>
                <div className="notification-text">
                  <h4>All Good!</h4>
                  <p>No urgent notifications</p>
                </div>
              </div>
            )}
            
            {/* Low usage notifications */}
            {subscriptions.filter(sub => sub.usageFrequency === 'rarely').slice(0, 1).map((sub, index) => (
              <div key={`low-usage-${index}`} className="notification-item">
                <div className="notification-icon" style={{ 
                  background: 'transparent',
                  padding: '0'
                }}>
                  <img
                    src={getSubscriptionLogo(sub)}
                    alt={sub.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    style={{
                      display: 'none',
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: '#f39c12',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    🕒
                  </div>
                </div>
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
            Consider Cancelling ⚠️
          </div>
          <div className="panel-content">
            {cancellationCandidates.length > 0 ? (
              cancellationCandidates.map((sub, index) => (
                <div key={index} className="cancellation-item">
                  <div className="service-info">
                    <div className="service-icon" style={{ 
                      background: 'transparent',
                      padding: '0'
                    }}>
                      <img
                        src={getSubscriptionLogo(sub)}
                        alt={sub.name}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        style={{
                          display: 'none',
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          background: getCategoryColor(sub.category),
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '12px'
                        }}
                      >
                        {getServiceInitials(sub.name)}
                      </div>
                    </div>
                    <div className="service-details">
                      <h4>{sub.name}</h4>
                      <span className="service-tag" style={{ backgroundColor: getTagColor(sub.category) }}>
                        {sub.category}
                      </span>
                    </div>
                  </div>
                  <div className="service-price">{sub.price}/mo</div>
                </div>
              ))
            ) : (
              <div className="notification-item">
                <div className="notification-icon" style={{ backgroundColor: '#27ae60' }}>
                  ✓
                </div>
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

        {/* Add Subscription Button */}
        <button className="add-subscription" onClick={handleAddSubscription}>
          <div className="add-icon">+</div>
          <div className="add-text">Add Subscription</div>
        </button>

        {/* Recent Subscriptions */}
        <div className="recent-subscriptions">
          <div className="section-header">Recent Subscriptions</div>
          <div className="subscriptions-grid">
            {recentSubscriptions.length > 0 ? (
              recentSubscriptions.map((sub, index) => (
                <div key={sub.id} className="subscription-item">
                  <div className="subscription-info">
                    <div className="subscription-icon" style={{ 
                      background: 'transparent',
                      padding: '0'
                    }}>
                      <img
                        src={getSubscriptionLogo(sub)}
                        alt={sub.name}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '4px',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        style={{
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
                        }}
                      >
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

        {/* Quick Tips */}
        <div className="quick-tips">
          <div className="tips-header">Quick Tips</div>
          <div className="tips-icon">💡</div>
          <div className="tips-text">
            Spotting subscriptions you rarely use?<br />
            Consider pausing or cancelling them —<br />
            future you will thank you.
          </div>
          <button className="tips-button" onClick={() => navigate('/usage')}>
            VIEW USAGE INSIGHTS →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;