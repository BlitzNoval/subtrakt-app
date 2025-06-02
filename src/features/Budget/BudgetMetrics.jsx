import React, { useState } from 'react';
import '../../styles/Budget/BudgetOverview.css';
import '../../styles/Budget/BudgetHiLo.css';
import '../../styles/Budget/SetBudget.css';

const BudgetMetrics = ({ 
  subscriptions, 
  totalMonthlySpent, 
  budgetLimit, 
  setBudgetLimit, 
  chartLoading 
}) => {
  const [tempBudget, setTempBudget] = useState(budgetLimit);
  const [showBudgetEdit, setShowBudgetEdit] = useState(false);

  // Get highest and lowest subscriptions
  const getHighestLowest = () => {
    if (subscriptions.length === 0) return { highest: null, lowest: null };
    
    const sorted = [...subscriptions].sort((a, b) => {
      const priceA = parseFloat(a.price?.replace(/[^\d.]/g, '') || 0);
      const priceB = parseFloat(b.price?.replace(/[^\d.]/g, '') || 0);
      return priceB - priceA;
    });

    return {
      highest: sorted[0],
      lowest: sorted[sorted.length - 1]
    };
  };

  const { highest, lowest } = getHighestLowest();
  const budgetRemaining = budgetLimit - totalMonthlySpent;
  const budgetPercentage = (totalMonthlySpent / budgetLimit) * 100;
  const isOverBudget = totalMonthlySpent > budgetLimit;

  const handleBudgetSave = async () => {
    // Simulate API call to save budget
    await new Promise(resolve => setTimeout(resolve, 500));
    setBudgetLimit(tempBudget);
    setShowBudgetEdit(false);
  };

  return (
    <>
      <div className="budget-overview-card">
        <div className="budget-header">
          <h3>Monthly Budget</h3>
          <button 
            className="edit-budget-btn"
            onClick={() => setShowBudgetEdit(!showBudgetEdit)}
            disabled={chartLoading}
          >
            {showBudgetEdit ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
        {showBudgetEdit ? (
          <div className="budget-edit">
            <input
              type="number"
              value={tempBudget}
              onChange={(e) => setTempBudget(Number(e.target.value))}
              className="budget-input"
            />
            <button onClick={handleBudgetSave} className="save-budget-btn">
              Save Budget
            </button>
          </div>
        ) : (
          <>
            <div className="budget-amount">R{budgetLimit.toFixed(2)}</div>
            <div className="budget-progress">
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${isOverBudget ? 'over-budget' : ''}`}
                  style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                />
              </div>
              <div className="budget-stats">
                <div>
                  <span className="label">Spent</span>
                  <span className={`amount ${isOverBudget ? 'text-red' : ''}`}>
                    R{totalMonthlySpent.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="label">{isOverBudget ? 'Over' : 'Remaining'}</span>
                  <span className={`amount ${isOverBudget ? 'text-red' : 'text-green'}`}>
                    R{Math.abs(budgetRemaining).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="subscription-extremes">
        <div className="extreme-card highest">
          <div className="extreme-icon">📈</div>
          <h4>Highest Subscription</h4>
          {highest ? (
            <>
              <div className="subscription-name">{highest.name}</div>
              <div className="subscription-price">{highest.price}/mo</div>
            </>
          ) : (
            <div className="no-data">No subscriptions</div>
          )}
        </div>

        <div className="extreme-card lowest">
          <div className="extreme-icon">📉</div>
          <h4>Lowest Subscription</h4>
          {lowest ? (
            <>
              <div className="subscription-name">{lowest.name}</div>
              <div className="subscription-price">{lowest.price}/mo</div>
            </>
          ) : (
            <div className="no-data">No subscriptions</div>
          )}
        </div>
      </div>
    </>
  );
};

export default BudgetMetrics;