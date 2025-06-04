import React from 'react';

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="table-container">
      <div className="empty-state">
        <div className="empty-icon">📱</div>
        <h3>No subscriptions yet - Start by adding your first </h3>
        <p>⚠️ If you'd prefer not to complete this step, you can see the full app functionality by going to Settings and clicking "Load Mock Data"</p>
        
        <button onClick={onAddClick}>Add Your First Subscription</button>
      </div>
    </div>
  );
};

export default EmptyState;