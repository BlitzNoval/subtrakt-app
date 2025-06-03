import React from 'react';
import SpendingChart from './Charts/SpendingChart';
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