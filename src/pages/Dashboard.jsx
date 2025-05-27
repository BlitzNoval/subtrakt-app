import React from 'react';
import '../styles/Dashboard/DashboardHeader.css';
import '../styles/Dashboard/DashboardGrid.css';
import '../styles/Dashboard/DashboardQuickTips.css';
import '../styles/Dashboard/DashboardRecent.css';
import '../styles/Dashboard/DashboardMetrics.css';
import '../styles/Dashboard/DashboardPanels.css';

// Mock context for demo
const useSubscriptions = () => ({
  loading: false,
  activeSubscriptions: 16,
  newSubscriptionsThisMonth: 6,
  freeTrialsActive: 2,
  totalMonthlySpent: 470,
  subscriptions: [
    { id: 1, name: 'Netflix', price: 'R 199', isTrial: false, category: 'Entertainment' },
    { id: 2, name: 'Spotify', price: 'R 59', isTrial: false, category: 'Entertainment' },
    { id: 3, name: 'Adobe Creative Cloud', price: 'R 679', isTrial: true, category: 'Software' }
  ]
});

const Dashboard = () => {
  const {
    loading,
    activeSubscriptions,
    newSubscriptionsThisMonth,
    freeTrialsActive,
    totalMonthlySpent,
    subscriptions
  } = useSubscriptions();

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your subscription data...</p>
      </div>
    );
  }

  const trialsEndingSoon = subscriptions.filter(sub => sub.isTrial).slice(0, 2);

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="top-header">
        <h1 className="logo">Subtrakt</h1>
        <div className="header-icons">
          <button className="icon-button help-button">?</button>
          <button className="icon-button profile-button">👤</button>
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
            <div className="metric-number">R{totalMonthlySpent}</div>
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
            {trialsEndingSoon.map((trial, index) => (
              <div key={index} className="notification-item">
                <div className="notification-icon" style={{ backgroundColor: '#e74c3c' }}>
                  {trial.name.charAt(0)}
                </div>
                <div className="notification-text">
                  <h4>Free Trial Ending Soon</h4>
                  <p>{trial.name} trial ends 72 hours</p>
                </div>
              </div>
            ))}
            {trialsEndingSoon.length === 0 && (
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
            <div className="notification-item">
              <div className="notification-icon" style={{ backgroundColor: '#f39c12' }}>
                🕒
              </div>
              <div className="notification-text">
                <h4>Low Usage Time</h4>
                <p>Subscription rarely used</p>
              </div>
            </div>
            <button className="view-more blue">VIEW MORE →</button>
          </div>
        </div>

        {/* Consider Cancelling */}
        <div className="consider-cancelling">
          <div className="panel-header red">
            Consider Cancelling ⚠️
          </div>
          <div className="panel-content">
            <div className="cancellation-item">
              <div className="service-info">
                <div className="service-icon">NE</div>
                <div className="service-details">
                  <h4>Netflix</h4>
                  <span className="service-tag">Entertainment</span>
                </div>
              </div>
              <div className="service-price">R199.00/mo</div>
            </div>
            <div className="cancellation-item">
              <div className="service-info">
                <div className="service-icon" style={{ backgroundColor: '#e74c3c' }}>
                  AD
                </div>
                <div className="service-details">
                  <h4>Adobe Creative Cloud</h4>
                  <span className="service-tag" style={{ backgroundColor: '#f39c12' }}>
                    Software
                  </span>
                </div>
              </div>
              <div className="service-price">R679.00/mo</div>
            </div>
            <button className="view-more red">VIEW MORE →</button>
          </div>
        </div>

        {/* Add Subscription Button */}
        <button className="add-subscription">
          <div className="add-icon">+</div>
          <div className="add-text">Add Subscription</div>
        </button>

        {/* Recent Subscriptions */}
        <div className="recent-subscriptions">
          <div className="section-header">Recent Subscriptions</div>
          <div className="subscriptions-grid">
            <div className="subscription-item">
              <div className="subscription-info">
                <div className="subscription-icon" style={{ backgroundColor: '#3498db' }}>
                  WSJ
                </div>
                <div className="subscription-details">
                  <h4>Wall Street Journal</h4>
                  <span className="subscription-tag" style={{ backgroundColor: '#f39c12' }}>
                    Finance Tools
                  </span>
                </div>
              </div>
              <div className="subscription-price">
                <div className="amount">R110.00/mo</div>
                <div className="period">Renews May 20</div>
              </div>
            </div>

            <div className="subscription-item">
              <div className="subscription-info">
                <div className="subscription-icon" style={{ backgroundColor: '#0077b5' }}>
                  LI
                </div>
                <div className="subscription-details">
                  <h4>LinkedIn Premium</h4>
                  <span className="subscription-tag" style={{ backgroundColor: '#27ae60' }}>
                    Professional
                  </span>
                </div>
              </div>
              <div className="subscription-price">
                <div className="amount">R110.00/mo</div>
                <div className="period">Free Trial</div>
              </div>
            </div>

            <div className="subscription-item">
              <div className="subscription-info">
                <div className="subscription-icon" style={{ backgroundColor: '#e74c3c' }}>
                  MO
                </div>
                <div className="subscription-details">
                  <h4>Monday.com</h4>
                  <span className="subscription-tag" style={{ backgroundColor: '#74b9ff' }}>
                    Productivity
                  </span>
                </div>
              </div>
              <div className="subscription-price">
                <div className="amount">R1110.00/yr</div>
                <div className="period">Renews May 28</div>
              </div>
            </div>

            <div className="subscription-item">
              <div className="subscription-info">
                <div className="subscription-icon" style={{ backgroundColor: '#27ae60' }}>
                  DU
                </div>
                <div className="subscription-details">
                  <h4>Duolingo</h4>
                  <span className="subscription-tag" style={{ backgroundColor: '#e17055' }}>
                    Entertainment
                  </span>
                </div>
              </div>
              <div className="subscription-price">
                <div className="amount">R110.00/mo</div>
                <div className="period">Renews May 14</div>
              </div>
            </div>
          </div>
          <button className="view-more green">VIEW MORE →</button>
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
          <button className="tips-button">VIEW USAGE INSIGHTS →</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;