import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscriptions } from '../../context/SubscriptionContext';
import DashboardMetrics from './DashboardMetrics';
import DashboardPanels from './DashboardPanels';
import RecentSubscriptions from './Sections/RecentSubscriptions';
import QuickTips from './Sections/QuickTips';
import '../../styles/Dashboard/DashboardHeader.css';
import '../../styles/Dashboard/DashboardGrid.css';
import '../../styles/Dashboard/DBResponsiveness.css';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  
  const {
    loading,
    activeSubscriptions,
    newSubscriptionsThisMonth,
    freeTrialsActive,
    totalMonthlySpent,
    subscriptions,
    getSubscriptionLogo
  } = useSubscriptions();

  // Get user name from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    
    if (storedName) {
      setUserName(storedName);
    } else if (storedEmail) {
      const emailPrefix = storedEmail.split('@')[0];
      setUserName(emailPrefix);
    } else {
      setUserName('User');
    }
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your subscription data...</p>
      </div>
    );
  }

  const handleAddSubscription = () => {
    navigate('/subscriptions');
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="top-header">
        <h1 className="logo">  Your Subtrakt Dashboard </h1>
        <div className="header-icons">
          <button className="icon-button help-button" onClick={() => navigate('/settings')}>
            <div className="centered-icon">
            <img 
              src="/images/Doc.png" 
              alt="Notifications"
            />
          </div>
          </button>

          <button className="icon-button profile-button" onClick={() => navigate('/settings')}>
          <div className="centered-icon">
            <img 
              src="/images/User.png" 
              alt="Notifications"
            />
          </div>
        </button>

        </div>
      </header>
  
      <hr className="header-divider" />

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        <DashboardMetrics 
          userName={userName}
          activeSubscriptions={activeSubscriptions}
          totalMonthlySpent={totalMonthlySpent}
          newSubscriptionsThisMonth={newSubscriptionsThisMonth}
          freeTrialsActive={freeTrialsActive}
        />
        
        <DashboardPanels 
          subscriptions={subscriptions}
          getSubscriptionLogo={getSubscriptionLogo}
          navigate={navigate}
        />
        
        <button className="add-subscription" onClick={handleAddSubscription}>
          <img 
            src="/images/Add.png" 
            alt="Notifications" 
            className="add-icon"
          />
          <div className="add-text">Add Subscription</div>
        </button>

        <RecentSubscriptions 
          subscriptions={subscriptions}
          getSubscriptionLogo={getSubscriptionLogo}
          navigate={navigate}
        />

        <QuickTips navigate={navigate} />
      </div>
    </div>
  );
};

export default MainDashboard;