import React, { useState, useEffect } from 'react';
import { useSubscriptions } from '../../context/SubscriptionContext';
import UsageList from './UsageList';
import UsageCharts from './UsageCharts';
import '../../styles/Usage/Usage.css';
import '../../styles/Usage/UsageSorting.css';

const MainUsage = () => {
  const { subscriptions, getSubscriptionLogo } = useSubscriptions();
  const [sortOrder, setSortOrder] = useState('highest');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '', importance: '', status: '', priceRange: '', billingCycle: ''
  });
  const [pageLoading, setPageLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(false);

  useEffect(() => {
    const loadUsageData = async () => {
      setPageLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 300));
      setPageLoading(false);
    };
    loadUsageData();
  }, []);

  // Normalize different usage frequencies to monthly standard , basically how we are calculating usage hours per usage payment
  // This ensures that daily, weekly, and monthly subscriptions are comparable
  // Enables consistent value calculations across varied input patterns like 'daily', 'weekly', 'monthly', etc.

  useEffect(() => {
    const recalculateInsights = async () => {
      if (!pageLoading) {
        setInsightsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 400));
        setInsightsLoading(false);
      }
    };

    // Dynamic sorting based on calculated usage metrics
    // Allows users to identify high/low value subscriptions quickly

    recalculateInsights();
  }, [sortOrder, filters, searchTerm, pageLoading]);

  // Convert usage frequency to hours per month
  const getMonthlyUsageHours = (sub) => {
    const hours = parseFloat(sub.usageHours || 0);
    switch (sub.usageFrequency) {
      case 'daily': return hours * 30;
      case 'weekly': return hours * 4;
      case 'monthly': return hours;
      case 'rarely': return hours * 0.5;
      default: return hours * 4;
    }
  };

  // Filter and sort subscriptions
  const filteredSubscriptions = subscriptions.filter(sub => {
    if (searchTerm && !sub.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filters.category && sub.category !== filters.category) return false;
    if (filters.importance && sub.importance !== filters.importance) return false;
    return true;
  });

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    const usageA = getMonthlyUsageHours(a);
    const usageB = getMonthlyUsageHours(b);
    return sortOrder === 'highest' ? usageB - usageA : usageA - usageB;
  });

  const categories = [...new Set(subscriptions.map(sub => sub.category))].filter(Boolean);
  const importanceLevels = ['Critical', 'Regular', 'Optional'];

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
        <UsageList
          subscriptions={sortedSubscriptions}
          getSubscriptionLogo={getSubscriptionLogo}
          getMonthlyUsageHours={getMonthlyUsageHours}
          onSearch={setSearchTerm}
          onFilter={setFilters}
          categories={categories}
          importanceLevels={importanceLevels}
        />
        
        <UsageCharts
          subscriptions={sortedSubscriptions}
          getMonthlyUsageHours={getMonthlyUsageHours}
          insightsLoading={insightsLoading}
        />
      </div>
    </div>
  );
};

export default MainUsage;