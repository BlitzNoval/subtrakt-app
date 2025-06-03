import React from 'react';
import SearchFilter from '../../components/SearchFilter';
import UsageItem from './Visuals/UsageItem';
import '../../styles/Usage/UsageStats.css';

const UsageList = ({ 
  subscriptions, 
  getSubscriptionLogo, 
  getMonthlyUsageHours,
  onSearch,
  onFilter,
  categories,
  importanceLevels
}) => {
  return (
    <div className="usage-list-section">
      <SearchFilter
        onSearch={onSearch}
        onFilter={onFilter}
        categories={categories}
        importanceLevels={importanceLevels}
      />
      
      <div className="usage-list">
        {subscriptions.length > 0 ? (
          subscriptions.map(sub => {
            const monthlyHours = getMonthlyUsageHours(sub);
            const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
            const valueScore = price > 0 ? (monthlyHours / price * 10).toFixed(1) : 0;
            
            return (
              <UsageItem
                key={sub.id}
                subscription={sub}
                monthlyHours={monthlyHours}
                valueScore={valueScore}
                getSubscriptionLogo={getSubscriptionLogo}
              />
            );
          })
        ) : (
          <div className="no-data-message">
            No subscriptions found. Add some subscriptions to see usage insights.
          </div>
        )}
      </div>
    </div>
  );
};

export default UsageList;