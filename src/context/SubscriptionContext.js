import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { subscriptionReducer, initialState, ActionTypes } from './contextSections/subscriptionReducer';
import { subscriptionActions } from './contextSections/subscriptionActions';

// Create context
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

  // Save to localStorage whenever subscriptions or budget change
  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(state.subscriptions));
    localStorage.setItem('budgetLimit', state.budgetLimit.toString());
  }, [state.subscriptions, state.budgetLimit]);

  // Initialize calculations on mount
  useEffect(() => {
    dispatch({ type: ActionTypes.SET_SUBSCRIPTIONS, payload: state.subscriptions });
  }, []);

  // Create all actions with dispatch
  const actions = subscriptionActions(dispatch, state);

  const value = {
    ...state,
    ...actions
  };

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