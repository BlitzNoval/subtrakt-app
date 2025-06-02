import React, { useState, useEffect } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import '../styles/Budget/Budget.css';
import '../styles/Budget/BudgetHiLo.css';
import '../styles/Budget/BudgetOverview.css';
import '../styles/Budget/SetBudget.css';
import '../styles/Budget/LineChart.css';
import '../styles/Budget/PieChart.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Budget = () => {
  const { 
    subscriptions, 
    totalMonthlySpent, 
    budgetLimit, 
    setBudgetLimit 
  } = useSubscriptions();
  
  const [timeFrame, setTimeFrame] = useState('months');
  const [tempBudget, setTempBudget] = useState(budgetLimit);
  const [showBudgetEdit, setShowBudgetEdit] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);

  // Simulate initial page load
  useEffect(() => {
    const loadBudgetData = async () => {
      setPageLoading(true);
      // Simulate fetching budget analytics
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
  }, [timeFrame]);

  // Calculate spending data for different time frames
  const getSpendingData = () => {
    const now = new Date();
    const labels = [];
    const data = [];

    if (timeFrame === 'days') {
      // Last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        // Simulate daily spending (in reality, you'd calculate from actual data)
        data.push(Math.floor(totalMonthlySpent / 30) + Math.floor(Math.random() * 20));
      }
    } else if (timeFrame === 'months') {
      // Last 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
        // Use actual monthly spent with some variation for past months
        if (i === 0) {
          data.push(totalMonthlySpent);
        } else {
          data.push(totalMonthlySpent + Math.floor(Math.random() * 100 - 50));
        }
      }
    } else {
      // Last 5 years
      for (let i = 4; i >= 0; i--) {
        const year = now.getFullYear() - i;
        labels.push(year.toString());
        // Yearly data
        data.push(totalMonthlySpent * 12 + Math.floor(Math.random() * 500 - 250));
      }
    }

    return { labels, data };
  };

  // Calculate category spending
  const getCategorySpending = () => {
    const categoryTotals = {};
    
    subscriptions.forEach(sub => {
      const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
      const category = sub.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + price;
    });

    return {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#74b9ff',
          '#a29bfe',
          '#fd79a8',
          '#fdcb6e',
          '#6c5ce7',
          '#00b894',
          '#e17055',
          '#0984e3'
        ],
        borderWidth: 0
      }]
    };
  };

  // Get highest and lowest subscriptions
  const getHighestLowest = () => {
    if (subscriptions.length === 0) return { highest: null, lowest: null };
    
    const sorted = [...subscriptions].sort((a, b) => {
      const priceA = parseFloat(a.price?.replace(/[^\d.]/g, '') || 0);
      const priceB = parseFloat(b.price?.replace(/[^\d.]/g, '') || 0);
      return priceB - priceA;
    });

    return {
      highest: sorted[0],
      lowest: sorted[sorted.length - 1]
    };
  };

  const { highest, lowest } = getHighestLowest();
  const budgetRemaining = budgetLimit - totalMonthlySpent;
  const budgetPercentage = (totalMonthlySpent / budgetLimit) * 100;
  const isOverBudget = totalMonthlySpent > budgetLimit;

  const handleBudgetSave = async () => {
    setChartLoading(true);
    // Simulate API call to save budget
    await new Promise(resolve => setTimeout(resolve, 500));
    setBudgetLimit(tempBudget);
    setShowBudgetEdit(false);
    setChartLoading(false);
  };

  const spendingChartData = getSpendingData();
  const lineChartData = {
    labels: spendingChartData.labels,
    datasets: [{
      label: 'Spending',
      data: spendingChartData.data,
      borderColor: '#74b9ff',
      backgroundColor: 'rgba(116, 185, 255, 0.1)',
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `R${context.parsed.y.toFixed(2)}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `R${value}`
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: R${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

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
        {/* Spending Chart */}
        <div className="chart-card spending-chart">
          <h3>Spending Over Time</h3>
          <div className="chart-container">
            {chartLoading ? (
              <div className="chart-loading">
                <div className="loading-spinner"></div>
                <p>Updating chart...</p>
              </div>
            ) : (
              <Line data={lineChartData} options={lineChartOptions} />
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="chart-card category-chart">
          <h3>Spending by Category</h3>
          <div className="pie-chart-container">
            {chartLoading ? (
              <div className="chart-loading">
                <div className="loading-spinner"></div>
                <p>Calculating categories...</p>
              </div>
            ) : (
              <Doughnut data={getCategorySpending()} options={pieChartOptions} />
            )}
          </div>
        </div>

        {/* Budget Overview */}
        <div className="budget-overview-card">
          <div className="budget-header">
            <h3>Monthly Budget</h3>
            <button 
              className="edit-budget-btn"
              onClick={() => setShowBudgetEdit(!showBudgetEdit)}
              disabled={chartLoading}
            >
              {showBudgetEdit ? 'Cancel' : 'Edit'}
            </button>
          </div>
          
          {showBudgetEdit ? (
            <div className="budget-edit">
              <input
                type="number"
                value={tempBudget}
                onChange={(e) => setTempBudget(Number(e.target.value))}
                className="budget-input"
              />
              <button onClick={handleBudgetSave} className="save-budget-btn">
                Save Budget
              </button>
            </div>
          ) : (
            <>
              <div className="budget-amount">R{budgetLimit.toFixed(2)}</div>
              <div className="budget-progress">
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${isOverBudget ? 'over-budget' : ''}`}
                    style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                  />
                </div>
                <div className="budget-stats">
                  <div>
                    <span className="label">Spent</span>
                    <span className={`amount ${isOverBudget ? 'text-red' : ''}`}>
                      R{totalMonthlySpent.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="label">{isOverBudget ? 'Over' : 'Remaining'}</span>
                    <span className={`amount ${isOverBudget ? 'text-red' : 'text-green'}`}>
                      R{Math.abs(budgetRemaining).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Highest and Lowest */}
        <div className="subscription-extremes">
          <div className="extreme-card highest">
            <div className="extreme-icon">📈</div>
            <h4>Highest Subscription</h4>
            {highest ? (
              <>
                <div className="subscription-name">{highest.name}</div>
                <div className="subscription-price">{highest.price}/mo</div>
              </>
            ) : (
              <div className="no-data">No subscriptions</div>
            )}
          </div>

          <div className="extreme-card lowest">
            <div className="extreme-icon">📉</div>
            <h4>Lowest Subscription</h4>
            {lowest ? (
              <>
                <div className="subscription-name">{lowest.name}</div>
                <div className="subscription-price">{lowest.price}/mo</div>
              </>
            ) : (
              <div className="no-data">No subscriptions</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;