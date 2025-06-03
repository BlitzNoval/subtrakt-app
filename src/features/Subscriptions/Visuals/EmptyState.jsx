import React from 'react';

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="table-container">
      <div className="empty-state">
        <div className="empty-icon">📱</div>
        <h3>No subscriptions yet</h3>
        <p>Start by adding your first subscription to track your monthly spending.</p>
        <button onClick={onAddClick}>Add Your First Subscription</button>
      </div>
    </div>
  );
};

export default EmptyState;