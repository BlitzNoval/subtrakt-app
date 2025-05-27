import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state with some sample data
const initialState = {
  subscriptions: [
    {
      id: 1,
      name: 'Netflix',
      cost: '199',
      price: 'R 199',
      billingCycle: 'monthly',
      category: 'Entertainment',
      importance: 'Regular',
      usageHours: '15',
      usageFrequency: 'weekly',
      isTrial: false,
      renewalDate: '2025-06-15',
      dateAdded: '2025-01-15T00:00:00.000Z',
      notes: 'Family plan shared with household'
    },
    {
      id: 2,
      name: 'Spotify',
      cost: '59',
      price: 'R 59',
      billingCycle: 'monthly',
      category: 'Entertainment',
      importance: 'Critical',
      usageHours: '20',
      usageFrequency: 'daily',
      isTrial: false,
      renewalDate: '2025-06-10',
      dateAdded: '2025-02-01T00:00:00.000Z',
      notes: 'Premium individual plan'
    },
    {
      id: 3,
      name: 'Adobe Creative Cloud',
      cost: '679',
      price: 'R 679',
      billingCycle: 'monthly',
      category: 'Software',
      importance: 'Critical',
      usageHours: '25',
      usageFrequency: 'daily',
      isTrial: true,
      trialEndDate: '2025-06-30',
      renewalDate: '2025-06-30',
      dateAdded: '2025-05-01T00:00:00.000Z',
      notes: 'Free trial - decide before it ends'
    }
  ],
  loading: false,
  error: null,
  totalMonthlySpent: 0,
  activeSubscriptions: 0,
  budgetLimit: 1000, // Default budget limit
  newSubscriptionsThisMonth: 0,
  freeTrialsActive: 0
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_SUBSCRIPTIONS: 'SET_SUBSCRIPTIONS',
  ADD_SUBSCRIPTION: 'ADD_SUBSCRIPTION',
  UPDATE_SUBSCRIPTION: 'UPDATE_SUBSCRIPTION',
  DELETE_SUBSCRIPTION: 'DELETE_SUBSCRIPTION',
  SET_ERROR: 'SET_ERROR',
  SET_BUDGET_LIMIT: 'SET_BUDGET_LIMIT'
};

// Reducer function
const subscriptionReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_SUBSCRIPTIONS:
      const subscriptions = action.payload;
      return {
        ...state,
        subscriptions,
        activeSubscriptions: subscriptions.length,
        totalMonthlySpent: calculateTotalSpent(subscriptions),
        newSubscriptionsThisMonth: calculateNewSubscriptions(subscriptions),
        freeTrialsActive: calculateFreeTrials(subscriptions)
      };
    
    case ActionTypes.ADD_SUBSCRIPTION:
      const newSubscriptions = [...state.subscriptions, action.payload];
      return {
        ...state,
        subscriptions: newSubscriptions,
        activeSubscriptions: newSubscriptions.length,
        totalMonthlySpent: calculateTotalSpent(newSubscriptions),
        newSubscriptionsThisMonth: calculateNewSubscriptions(newSubscriptions),
        freeTrialsActive: calculateFreeTrials(newSubscriptions)
      };
    
    case ActionTypes.UPDATE_SUBSCRIPTION:
      const updatedSubscriptions = state.subscriptions.map(sub =>
        sub.id === action.payload.id ? action.payload : sub
      );
      return {
        ...state,
        subscriptions: updatedSubscriptions,
        totalMonthlySpent: calculateTotalSpent(updatedSubscriptions),
        freeTrialsActive: calculateFreeTrials(updatedSubscriptions)
      };
    
    case ActionTypes.DELETE_SUBSCRIPTION:
      const filteredSubscriptions = state.subscriptions.filter(
        sub => sub.id !== action.payload
      );
      return {
        ...state,
        subscriptions: filteredSubscriptions,
        activeSubscriptions: filteredSubscriptions.length,
        totalMonthlySpent: calculateTotalSpent(filteredSubscriptions),
        freeTrialsActive: calculateFreeTrials(filteredSubscriptions)
      };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ActionTypes.SET_BUDGET_LIMIT:
      return { ...state, budgetLimit: action.payload };
    
    default:
      return state;
  }
};

// Helper functions
const calculateTotalSpent = (subscriptions) => {
  return subscriptions.reduce((total, sub) => {
    // Extract numeric value from price string (e.g., "R 50" -> 50)
    const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || sub.cost || 0);
    return total + price;
  }, 0);
};

const calculateNewSubscriptions = (subscriptions) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  return subscriptions.filter(sub => {
    if (!sub.dateAdded) return false;
    const subDate = new Date(sub.dateAdded);
    return subDate.getMonth() === currentMonth && subDate.getFullYear() === currentYear;
  }).length;
};

const calculateFreeTrials = (subscriptions) => {
  return subscriptions.filter(sub => 
    sub.isTrial || sub.category === 'trial' || sub.price === 'Free Trial'
  ).length;
};

// Generate unique ID
const generateId = () => {
  return Date.now() + Math.random();
};

// Create context
const SubscriptionContext = createContext();

// Provider component
export const SubscriptionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);

  // Initialize calculations on mount
  useEffect(() => {
    dispatch({ type: ActionTypes.SET_SUBSCRIPTIONS, payload: state.subscriptions });
  }, []);

  // Actions
  const setLoading = (loading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
  };

  const setSubscriptions = (subscriptions) => {
    dispatch({ type: ActionTypes.SET_SUBSCRIPTIONS, payload: subscriptions });
  };

  const addSubscription = (subscription) => {
    dispatch({ type: ActionTypes.ADD_SUBSCRIPTION, payload: subscription });
  };

  const updateSubscription = (subscription) => {
    dispatch({ type: ActionTypes.UPDATE_SUBSCRIPTION, payload: subscription });
  };

  const deleteSubscription = (id) => {
    dispatch({ type: ActionTypes.DELETE_SUBSCRIPTION, payload: id });
  };

  const setError = (error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  };

  const setBudgetLimit = (limit) => {
    dispatch({ type: ActionTypes.SET_BUDGET_LIMIT, payload: limit });
  };

  // Mock API calls - now work with local state
  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Data is already in state, just trigger recalculation
      dispatch({ type: ActionTypes.SET_SUBSCRIPTIONS, payload: state.subscriptions });
    } catch (error) {
      setError('Failed to fetch subscriptions');
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSubscription = async (subscriptionData) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const subscription = {
        ...subscriptionData,
        id: subscriptionData.id || generateId(),
        dateAdded: subscriptionData.dateAdded || new Date().toISOString(),
        price: `R ${subscriptionData.cost}`,
      };
      
      if (subscriptionData.id) {
        // Update existing
        updateSubscription(subscription);
      } else {
        // Add new
        addSubscription(subscription);
      }
    } catch (error) {
      setError('Failed to save subscription');
      console.error('Error saving subscription:', error);
      throw error; // Re-throw so the modal can handle it
    } finally {
      setLoading(false);
    }
  };

  const removeSubscription = async (id) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      deleteSubscription(id);
    } catch (error) {
      setError('Failed to delete subscription');
      console.error('Error deleting subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    ...state,
    // Actions
    setLoading,
    setSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    setError,
    setBudgetLimit,
    // API calls
    fetchSubscriptions,
    saveSubscription,
    removeSubscription
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