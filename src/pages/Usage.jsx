import React, { useState, useEffect } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import SearchFilter from '../components/SearchFilter';
import '../styles/Usage/UsageCharts.css';
import '../styles/Usage/Usage.css';
import '../styles/Usage/UsageStats.css';
import '../styles/Usage/UsageSorting.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Usage = () => {
  const { subscriptions, getSubscriptionLogo } = useSubscriptions();
  const [sortOrder, setSortOrder] = useState('highest');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    importance: '',
    status: '',
    priceRange: '',
    billingCycle: ''
  });
  const [pageLoading, setPageLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(false);

  // Simulate initial page load
  useEffect(() => {
    const loadUsageData = async () => {
      setPageLoading(true);
      // Simulate fetching usage analytics
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 300));
      setPageLoading(false);
    };
    
    loadUsageData();
  }, []);

  // Simulate insights recalculation
  useEffect(() => {
    const recalculateInsights = async () => {
      if (!pageLoading) {
        setInsightsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 400));
        setInsightsLoading(false);
      }
    };
    
    recalculateInsights();
  }, [sortOrder, filters, searchTerm]);

  // Convert usage frequency to hours per month for comparison
  const getMonthlyUsageHours = (sub) => {
    const hours = parseFloat(sub.usageHours || 0);
    switch (sub.usageFrequency) {
      case 'daily':
        return hours * 30;
      case 'weekly':
        return hours * 4;
      case 'monthly':
        return hours;
      case 'rarely':
        return hours * 0.5;
      default:
        return hours * 4; // Default to weekly
    }
  };

  // Filter and sort subscriptions
  const filteredSubscriptions = subscriptions.filter(sub => {
    if (searchTerm && !sub.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.category && sub.category !== filters.category) {
      return false;
    }
    if (filters.importance && sub.importance !== filters.importance) {
      return false;
    }
    return true;
  });

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    const usageA = getMonthlyUsageHours(a);
    const usageB = getMonthlyUsageHours(b);
    return sortOrder === 'highest' ? usageB - usageA : usageA - usageB;
  });

  // Calculate usage data for doughnut chart
  const getUsageChartData = () => {
    const usageData = sortedSubscriptions.map(sub => getMonthlyUsageHours(sub));
    const labels = sortedSubscriptions.map(sub => sub.name);
    
    return {
      labels,
      datasets: [{
        data: usageData,
        backgroundColor: [
          '#74b9ff',
          '#a29bfe',
          '#fd79a8',
          '#fdcb6e',
          '#6c5ce7',
          '#00b894',
          '#e17055',
          '#0984e3',
          '#00cec9',
          '#ff7675'
        ],
        borderWidth: 0
      }]
    };
  };

  // Calculate usage vs cost comparison (value for money)
  const getValueComparisonData = () => {
    const validSubs = sortedSubscriptions.filter(sub => getMonthlyUsageHours(sub) > 0);
    const labels = validSubs.map(sub => sub.name);
    
    // Calculate value score: usage hours as percentage of cost
    const valueScores = validSubs.map(sub => {
      const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
      const monthlyHours = getMonthlyUsageHours(sub);
      // Value score: hours per R10 spent
      return price > 0 ? (monthlyHours / price * 10).toFixed(1) : 0;
    });

    return {
      labels,
      datasets: [{
        label: 'Usage Value (Hours per R10 spent)',
        data: valueScores,
        backgroundColor: '#74b9ff',
        borderRadius: 8
      }]
    };
  };

  // Generate insights
  const getInsights = () => {
    const insights = [];
    
    // Lowest usage subscriptions
    const lowUsage = sortedSubscriptions
      .filter(sub => getMonthlyUsageHours(sub) < 10)
      .slice(0, 3);
    
    if (lowUsage.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Low Usage Alert',
        message: `Consider cancelling ${lowUsage.map(s => s.name).join(', ')} - you use them less than 10 hours per month`,
        icon: '⚠️'
      });
    }

    // Unused premium subscriptions
    const unusedSubscriptions = sortedSubscriptions
      .filter(sub => getMonthlyUsageHours(sub) < 5)
      .filter(sub => parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0) > 50);
    
    if (unusedSubscriptions.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Unused Premium Subscriptions',
        message: `You're paying for ${unusedSubscriptions[0].name} but barely using it - consider downgrading or cancelling`,
        icon: '💸'
      });
    }

    // Best value subscription
    const bestValue = sortedSubscriptions
      .filter(sub => getMonthlyUsageHours(sub) > 20)
      .map(sub => ({
        ...sub,
        valueScore: getMonthlyUsageHours(sub) / parseFloat(sub.price?.replace(/[^\d.]/g, '') || 1)
      }))
      .sort((a, b) => b.valueScore - a.valueScore)[0];

    if (bestValue) {
      insights.push({
        type: 'success',
        title: 'Best Value Subscription',
        message: `${bestValue.name} gives you ${getMonthlyUsageHours(bestValue).toFixed(0)} hours of use for just ${bestValue.price} - great value!`,
        icon: '🌟'
      });
    }

    // Usage trend insight
    const totalUsageHours = sortedSubscriptions.reduce((sum, sub) => sum + getMonthlyUsageHours(sub), 0);
    const avgHoursPerSub = totalUsageHours / sortedSubscriptions.length || 0;
    
    if (sortedSubscriptions.length > 0) {
      insights.push({
        type: 'info',
        title: 'Usage Pattern',
        message: `You use your subscriptions for ${totalUsageHours.toFixed(0)} hours per month total, averaging ${avgHoursPerSub.toFixed(0)} hours per service`,
        icon: '📊'
      });
    }

    return insights;
  };

  const insights = getInsights();
  const categories = [...new Set(subscriptions.map(sub => sub.category))].filter(Boolean);
  const importanceLevels = ['Critical', 'Regular', 'Optional'];

  // Get service initials for fallback
  const getServiceInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value.toFixed(1)} hrs/month`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} hours per R10 spent`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} hrs`
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  if (pageLoading) {
    return (
      <div className="usage-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing usage patterns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="usage-page">
      <div className="page-header">
        <h1>Usage Insights</h1>
        <div className="sort-selector">
          <button 
            className={sortOrder === 'highest' ? 'active' : ''}
            onClick={() => setSortOrder('highest')}
          >
            Highest First
          </button>
          <button 
            className={sortOrder === 'lowest' ? 'active' : ''}
            onClick={() => setSortOrder('lowest')}
          >
            Lowest First
          </button>
        </div>
      </div>

      <div className="usage-content">
        {/* Usage List */}
        <div className="usage-list-section">
          <SearchFilter
            onSearch={setSearchTerm}
            onFilter={setFilters}
            categories={categories}
            importanceLevels={importanceLevels}
          />
          
          <div className="usage-list">
            {sortedSubscriptions.length > 0 ? (
              sortedSubscriptions.map(sub => {
                const monthlyHours = getMonthlyUsageHours(sub);
                const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
                const valueScore = price > 0 ? (monthlyHours / price * 10).toFixed(1) : 0;
                
                return (
                  <div key={sub.id} className="usage-item">
                    <div className="usage-icon" style={{ 
                      background: 'transparent',
                      padding: '0'
                    }}>
                      <img
                        src={getSubscriptionLogo(sub)}
                        alt={sub.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
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
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          backgroundColor: getCategoryColor(sub.category),
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}
                      >
                        {getServiceInitials(sub.name)}
                      </div>
                    </div>
                    <div className="usage-details">
                      <h4>{sub.name}</h4>
                      <span className="usage-category">{sub.category}</span>
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
              })
            ) : (
              <div className="no-data-message">
                No subscriptions found. Add some subscriptions to see usage insights.
              </div>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-card">
            <h3>Usage Distribution</h3>
            <div className="doughnut-container">
              {sortedSubscriptions.length > 0 ? (
                <Doughnut data={getUsageChartData()} options={doughnutOptions} />
              ) : (
                <div className="no-data-message">No data to display</div>
              )}
            </div>
          </div>

          <div className="chart-card">
            <h3>Value Comparison</h3>
            <div className="bar-container">
              {sortedSubscriptions.filter(sub => getMonthlyUsageHours(sub) > 0).length > 0 ? (
                <Bar data={getValueComparisonData()} options={barOptions} />
              ) : (
                <div className="no-data-message">No usage data to compare</div>
              )}
            </div>
          </div>

          {/* Insights */}
          <div className="insights-section">
            <h3>Usage Insights</h3>
            {insightsLoading ? (
              <div className="insights-loading">
                <div className="loading-spinner"></div>
                <p>Generating personalized insights...</p>
              </div>
            ) : insights.length > 0 ? (
              insights.map((insight, index) => (
                <div key={index} className={`insight-card ${insight.type}`}>
                  <div className="insight-icon">{insight.icon}</div>
                  <div className="insight-content">
                    <h4>{insight.title}</h4>
                    <p>{insight.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data-message">
                Add subscriptions with usage data to see personalized insights.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for category colors
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
    'Mobile Data': '#16a085',
    'Other': '#95a5a6'
  };
  return colors[category] || '#3498db';
};

export default Usage;