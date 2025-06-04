import React from 'react';
import CategoryChart from './Charts/CategoryChart';

const BudgetCharts = ({ subscriptions, totalMonthlySpent, timeFrame, chartLoading }) => {
  return (
    <>
      <CategoryChart 
        subscriptions={subscriptions} 
        chartLoading={chartLoading}
      />
    </>
  );
};

// Aggregate spending data by category for chart visualization
// Converts flat subscription list to hierarchical chart data
// This allows users to see how much they spend in each category
// The chart provides a visual breakdown of spending patterns

export default BudgetCharts;