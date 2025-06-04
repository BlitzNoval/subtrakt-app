import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { subscriptionReducer, initialState, ActionTypes } from './contextSections/subscriptionReducer';
import { subscriptionActions } from './contextSections/subscriptionActions';

// Global state management for subscription data
// Load saved subscriptions when app starts
// If nothing saved, use empty defaults

const SubscriptionContext = createContext();

// Provider component
export const SubscriptionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subscriptionReducer, {
    ...initialState,
    subscriptions: (() => {
      const savedSubscriptions = localStorage.getItem('subscriptions');
      return savedSubscriptions ? JSON.parse(savedSubscriptions) : initialState.subscriptions;
    })(),
    budgetLimit: (() => {
      const savedBudget = localStorage.getItem('budgetLimit');
      return savedBudget ? parseFloat(savedBudget) : 1000;
    })()
  });
  // Save to browser storage whenever data changes
  // User keeps their subscriptions after closing browser
  // whenever subscriptions or budget change

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(state.subscriptions));
    localStorage.setItem('budgetLimit', state.budgetLimit.toString());
  }, [state.subscriptions, state.budgetLimit]);

  // Initialize calculations on mount
  // Calculate totals and counts when app loads
  // Makes sure dashboard shows correct numbers
  useEffect(() => {
    dispatch({ type: ActionTypes.SET_SUBSCRIPTIONS, payload: state.subscriptions });
  }, []);

  // Create all action handlers
  // Separates messy logic from component stuff 
  const actions = subscriptionActions(dispatch, state);

  const value = {
    ...state,
    ...actions
  };

  // Combine state and actions into single context value
  // Provides complete subscription API to any component that wants it

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Custom hook to use the context
export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
};

export { ActionTypes };