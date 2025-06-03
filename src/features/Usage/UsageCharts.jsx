import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import UsageInsights from './Visuals/UsageInsights';
import { getCategoryColor } from '../../utils/CategoryColors';
import '../../styles/Usage/UsageCharts.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const UsageCharts = ({ subscriptions, getMonthlyUsageHours, insightsLoading }) => {
  // Calculate usage data for doughnut chart
  const getUsageChartData = () => {
    const usageData = subscriptions.map(sub => getMonthlyUsageHours(sub));
    const labels = subscriptions.map(sub => sub.name);
    const backgroundColors = subscriptions.map(sub => getCategoryColor(sub.category));

    return {
      labels,
      datasets: [{
        data: usageData,
        backgroundColor: backgroundColors,
        borderWidth: 0
      }]
    };
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 10, font: { size: 11 } }
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

  return (
    <div className="charts-section">
      <div className="chart-card">
        <h3>Usage Distribution</h3>
        <div className="doughnut-container">
          {subscriptions.length > 0 ? (
            <Doughnut data={getUsageChartData()} options={doughnutOptions} />
          ) : (
            <div className="no-data-message">No data to display</div>
          )}
        </div>
      </div>

      <UsageInsights
        subscriptions={subscriptions}
        getMonthlyUsageHours={getMonthlyUsageHours}
        insightsLoading={insightsLoading}
      />
    </div>
  );
};

export default UsageCharts;
