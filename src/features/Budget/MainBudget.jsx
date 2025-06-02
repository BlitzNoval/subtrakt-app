import React, { useState, useEffect } from 'react';
import { useSubscriptions } from '../../context/SubscriptionContext';
import BudgetCharts from './BudgetChart';
import BudgetMetrics from './BudgetMetrics';
import '../../styles/Budget/Budget.css';


const MainBudget = () => {
  const { 
    subscriptions, 
    totalMonthlySpent, 
    budgetLimit, 
    setBudgetLimit 
  } = useSubscriptions();
  
  const [timeFrame, setTimeFrame] = useState('months');
  const [pageLoading, setPageLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);

  // Simulate initial page load
  useEffect(() => {
    const loadBudgetData = async () => {
      setPageLoading(true);
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 400));
      setPageLoading(false);
    };
    
    loadBudgetData();
  }, []);

  // Simulate chart reload when timeframe changes
  useEffect(() => {
    const reloadCharts = async () => {
      if (!pageLoading) {
        setChartLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        setChartLoading(false);
      }
    };
    
    reloadCharts();
  }, [timeFrame, pageLoading]);

  if (pageLoading) {
    return (
      <div className="budget-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing your spending patterns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="budget-page">
      <div className="page-header">
        <h1>Budget</h1>
        <div className="time-frame-selector">
          <button 
            className={timeFrame === 'days' ? 'active' : ''}
            onClick={() => setTimeFrame('days')}
          >
            Days
          </button>
          <button 
            className={timeFrame === 'months' ? 'active' : ''}
            onClick={() => setTimeFrame('months')}
          >
            Months
          </button>
          <button 
            className={timeFrame === 'years' ? 'active' : ''}
            onClick={() => setTimeFrame('years')}
          >
            Years
          </button>
        </div>
      </div>

      <div className="budget-content">
        <BudgetCharts
          subscriptions={subscriptions}
          totalMonthlySpent={totalMonthlySpent}
          timeFrame={timeFrame}
          chartLoading={chartLoading}
        />
        
        <BudgetMetrics
          subscriptions={subscriptions}
          totalMonthlySpent={totalMonthlySpent}
          budgetLimit={budgetLimit}
          setBudgetLimit={setBudgetLimit}
          chartLoading={chartLoading}
        />
      </div>
    </div>
  );
};

export default MainBudget;