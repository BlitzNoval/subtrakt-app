import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import '../../../styles/Budget/PieChart.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ subscriptions, chartLoading }) => {
  
  // Calculate category spending
  const getCategorySpending = () => {
    const categoryTotals = {};
    
    subscriptions.forEach(sub => {
      const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
      const category = sub.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + price;
    });

    return {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#74b9ff',
          '#a29bfe',
          '#fd79a8',
          '#fdcb6e',
          '#6c5ce7',
          '#00b894',
          '#e17055',
          '#0984e3'
        ],
        borderWidth: 0
      }]
    };
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 15,
          font: { size: 12 }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: R${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="chart-card category-chart">
      <h3>Spending by Category</h3>
      <div className="pie-chart-container">
        {chartLoading ? (
          <div className="chart-loading">
            <div className="loading-spinner"></div>
            <p>Calculating categories...</p>
          </div>
        ) : (
          <Doughnut data={getCategorySpending()} options={pieChartOptions} />
        )}
      </div>
    </div>
  );
};

export default CategoryChart;