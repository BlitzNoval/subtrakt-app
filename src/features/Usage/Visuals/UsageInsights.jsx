import React from 'react';

const UsageInsights = ({ subscriptions, getMonthlyUsageHours, insightsLoading }) => {
  // Generate insights
  const getInsights = () => {
    const insights = [];
    
    // Lowest usage subscriptions
    const lowUsage = subscriptions
      .filter(sub => getMonthlyUsageHours(sub) < 10)
      .slice(0, 3);
    
    if (lowUsage.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Low Usage Alert',
        message: `Consider cancelling ${lowUsage.map(s => s.name).join(', ')} - you use them less than 10 hours per month`,
        icon: '⚠️'
      });
    }

    // Unused premium subscriptions
    const unusedSubscriptions = subscriptions
      .filter(sub => getMonthlyUsageHours(sub) < 5)
      .filter(sub => parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0) > 50);
    
    if (unusedSubscriptions.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Unused Premium Subscriptions',
        message: `You're paying for ${unusedSubscriptions[0].name} but barely using it - consider downgrading or cancelling`,
        icon: '💸'
      });
    }

    // Best value subscription
    const bestValue = subscriptions
      .filter(sub => getMonthlyUsageHours(sub) > 20)
      .map(sub => ({
        ...sub,
        valueScore: getMonthlyUsageHours(sub) / parseFloat(sub.price?.replace(/[^\d.]/g, '') || 1)
      }))
      .sort((a, b) => b.valueScore - a.valueScore)[0];

    if (bestValue) {
      insights.push({
        type: 'success',
        title: 'Best Value Subscription',
        message: `${bestValue.name} gives you ${getMonthlyUsageHours(bestValue).toFixed(0)} hours of use for just ${bestValue.price} - great value!`,
        icon: '🌟'
      });
    }

    // Usage trend insight
    const totalUsageHours = subscriptions.reduce((sum, sub) => sum + getMonthlyUsageHours(sub), 0);
    const avgHoursPerSub = totalUsageHours / subscriptions.length || 0;
    
    if (subscriptions.length > 0) {
      insights.push({
        type: 'info',
        title: 'Usage Pattern',
        message: `You use your subscriptions for ${totalUsageHours.toFixed(0)} hours per month total, averaging ${avgHoursPerSub.toFixed(0)} hours per service`,
        icon: '📊'
      });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="insights-section">
      <h3>Usage Insights</h3>
      {insightsLoading ? (
        <div className="insights-loading">
          <div className="loading-spinner"></div>
          <p>Generating personalized insights...</p>
        </div>
      ) : insights.length > 0 ? (
        insights.map((insight, index) => (
          <div key={index} className={`insight-card ${insight.type}`}>
            <div className="insight-icon">{insight.icon}</div>
            <div className="insight-content">
              <h4>{insight.title}</h4>
              <p>{insight.message}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="no-data-message">
          Add subscriptions with usage data to see personalized insights.
        </div>
      )}
    </div>
  );
};

export default UsageInsights;