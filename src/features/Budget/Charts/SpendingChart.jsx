import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../../../styles/Budget/LineChart.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SpendingChart = ({ totalMonthlySpent, timeFrame, chartLoading }) => {
  
  // Calculate spending data for different time frames
  const getSpendingData = () => {
    const now = new Date();
    const labels = [];
    const data = [];

    if (timeFrame === 'days') {
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        data.push(Math.floor(totalMonthlySpent / 30) + Math.floor(Math.random() * 20));
      }
    } else if (timeFrame === 'months') {
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
        if (i === 0) {
          data.push(totalMonthlySpent);
        } else {
          data.push(totalMonthlySpent + Math.floor(Math.random() * 100 - 50));
        }
      }
    } else {
      for (let i = 4; i >= 0; i--) {
        const year = now.getFullYear() - i;
        labels.push(year.toString());
        data.push(totalMonthlySpent * 12 + Math.floor(Math.random() * 500 - 250));
      }
    }

    return { labels, data };
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
      legend: { display: false },
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

  return (
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
  );
};

export default SpendingChart;