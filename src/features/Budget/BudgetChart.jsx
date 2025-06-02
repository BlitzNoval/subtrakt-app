import React from 'react';
import SpendingChart from './Charts/SpendingChart';
import CategoryChart from './Charts/CategoryChart';

const BudgetCharts = ({ subscriptions, totalMonthlySpent, timeFrame, chartLoading }) => {
  return (
    <>
      <SpendingChart 
        totalMonthlySpent={totalMonthlySpent}
        timeFrame={timeFrame}
        chartLoading={chartLoading}
      />
      
      <CategoryChart 
        subscriptions={subscriptions}  // ← Make sure this is passed!
        chartLoading={chartLoading}
      />
    </>
  );
};

export default BudgetCharts;