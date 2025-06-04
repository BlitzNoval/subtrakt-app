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

export default BudgetCharts;