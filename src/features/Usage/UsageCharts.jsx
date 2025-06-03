import React from 'react';
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
import UsageInsights from './Visuals/UsageInsights';
import '../../styles/Usage/UsageCharts.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const UsageCharts = ({ subscriptions, getMonthlyUsageHours, insightsLoading }) => {
  // Calculate usage data for doughnut chart
  const getUsageChartData = () => {
    const usageData = subscriptions.map(sub => getMonthlyUsageHours(sub));
    const labels = subscriptions.map(sub => sub.name);
    
    return {
      labels,
      datasets: [{
        data: usageData,
        backgroundColor: [
          '#74b9ff', '#a29bfe', '#fd79a8', '#fdcb6e', '#6c5ce7',
          '#00b894', '#e17055', '#0984e3', '#00cec9', '#ff7675'
        ],
        borderWidth: 0
      }]
    };
  };

  // Calculate value comparison data
  const getValueComparisonData = () => {
    const validSubs = subscriptions.filter(sub => getMonthlyUsageHours(sub) > 0);
    const labels = validSubs.map(sub => sub.name);
    const valueScores = validSubs.map(sub => {
      const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
      const monthlyHours = getMonthlyUsageHours(sub);
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

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} hours per R10 spent`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value) => `${value} hrs` }
      },
      x: {
        ticks: { maxRotation: 45, minRotation: 45 }
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

      <div className="chart-card">
        <h3>Value Comparison</h3>
        <div className="bar-container">
          {subscriptions.filter(sub => getMonthlyUsageHours(sub) > 0).length > 0 ? (
            <Bar data={getValueComparisonData()} options={barOptions} />
          ) : (
            <div className="no-data-message">No usage data to compare</div>
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