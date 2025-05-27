import React, { useEffect } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { Link } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
  const {
    loading,
    activeSubscriptions,
    newSubscriptionsThisMonth,
    freeTrialsActive,
    totalMonthlySpent,
    budgetLimit,
    fetchSubscriptions
  } = useSubscriptions();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your subscription data...</p>
      </div>
    );
  }

  const budgetPercentage = ((totalMonthlySpent / budgetLimit) * 100).toFixed(1);
  const isOverBudget = totalMonthlySpent > budgetLimit;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Your subscription overview at a glance</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="grid-item metric-card">
          <div className="metric-value">{activeSubscriptions}</div>
          <div className="metric-label">Active Subscriptions</div>
        </div>
        
        <div className="grid-item metric-card">
          <div className="metric-value">{newSubscriptionsThisMonth}</div>
          <div className="metric-label">New This Month</div>
        </div>
        
        <div className="grid-item metric-card">
          <div className="metric-value">{freeTrialsActive}</div>
          <div className="metric-label">Free Trials Active</div>
        </div>
        
        <div className="grid-item metric-card">
          <div className="metric-value">R{totalMonthlySpent.toFixed(2)}</div>
          <div className="metric-label">Total Monthly Spend</div>
        </div>
        
        <div className={`grid-item metric-card budget-card ${isOverBudget ? 'over-budget' : ''}`}>
          <div className="budget-info">
            <div className="budget-percentage">{budgetPercentage}%</div>
            <div className="budget-text">of R{budgetLimit.toFixed(2)} budget</div>
          </div>
          <div className="budget-bar">
            <div 
              className="budget-fill" 
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <Link to="/subscriptions" className="grid-item action-card">
          <div className="action-icon">➕</div>
          <div className="action-label">Add Subscription</div>
        </Link>
      </div>

      {/* Quick insights section */}
      <div className="dashboard-insights">
        <h2>Quick Insights</h2>
        <div className="insights-grid">
          {totalMonthlySpent > 0 && (
            <div className="insight-card">
              <h3>💡 Budget Status</h3>
              <p>
                {isOverBudget 
                  ? `You're R${(totalMonthlySpent - budgetLimit).toFixed(2)} over your monthly budget.`
                  : `You have R${(budgetLimit - totalMonthlySpent).toFixed(2)} left in your budget.`
                }
              </p>
            </div>
          )}
          
          {freeTrialsActive > 0 && (
            <div className="insight-card warning">
              <h3>⚠️ Active Trials</h3>
              <p>You have {freeTrialsActive} free trial{freeTrialsActive > 1 ? 's' : ''} that may convert to paid subscriptions.</p>
            </div>
          )}
          
          {newSubscriptionsThisMonth > 0 && (
            <div className="insight-card">
              <h3>📈 New Subscriptions</h3>
              <p>You've added {newSubscriptionsThisMonth} new subscription{newSubscriptionsThisMonth > 1 ? 's' : ''} this month.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;