import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { subscriptionService } from '../utils/SubscriptionService';
import mockSubscriptions from '../utils/Mockdata';

// Initial state without sample data
const initialState = {
  subscriptions: [],
  loading: false,
  error: null,
  totalMonthlySpent: 0,
  activeSubscriptions: 0,
  budgetLimit: 1000,
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
  SET_BUDGET_LIMIT: 'SET_BUDGET_LIMIT',
  RESET_SUBSCRIPTIONS: 'RESET_SUBSCRIPTIONS',
  LOAD_MOCK_DATA: 'LOAD_MOCK_DATA'
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
    
    case ActionTypes.RESET_SUBSCRIPTIONS:
      return {
        ...initialState,
        subscriptions: [],
        budgetLimit: 1000
      };
    
    case ActionTypes.LOAD_MOCK_DATA:
      return {
        ...state,
        subscriptions: mockSubscriptions,
        activeSubscriptions: mockSubscriptions.length,
        totalMonthlySpent: calculateTotalSpent(mockSubscriptions),
        newSubscriptionsThisMonth: calculateNewSubscriptions(mockSubscriptions),
        freeTrialsActive: calculateFreeTrials(mockSubscriptions)
      };
    
    default:
      return state;
  }
};

// Helper functions
const calculateTotalSpent = (subscriptions) => {
  return subscriptions.reduce((total, sub) => {
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

// Logo URL helper with fallback
const getLogoUrl = (subscription) => {
  if (subscription.logo) {
    return subscription.logo;
  }
  
  const matchedService = subscriptionService.getServiceByName(subscription.name);
  if (matchedService && matchedService.logo) {
    return matchedService.logo;
  }
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(subscription.name)}&background=74b9ff&color=fff&size=40`;
};

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

  const resetSubscriptions = () => {
    localStorage.removeItem('subscriptions');
    localStorage.removeItem('budgetLimit');
    dispatch({ type: ActionTypes.RESET_SUBSCRIPTIONS });
  };

  const loadMockData = () => {
    dispatch({ type: ActionTypes.LOAD_MOCK_DATA });
  };

  // Mock API calls
  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const enhancedSubscriptions = state.subscriptions.map(sub => ({
        ...sub,
        logo: getLogoUrl(sub)
      }));
      dispatch({ type: ActionTypes.SET_SUBSCRIPTIONS, payload: enhancedSubscriptions });
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
      await new Promise(resolve => setTimeout(resolve, 300));
      const subscription = {
        ...subscriptionData,
        id: subscriptionData.id || generateId(),
        dateAdded: subscriptionData.dateAdded || new Date().toISOString(),
        price: `R ${subscriptionData.cost}`,
        logo: subscriptionData.logo || getLogoUrl(subscriptionData)
      };
      
      if (subscriptionData.id) {
        updateSubscription(subscription);
      } else {
        addSubscription(subscription);
      }
    } catch (error) {
      setError('Failed to save subscription');
      console.error('Error saving subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSubscription = async (id) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      deleteSubscription(id);
    } catch (error) {
      setError('Failed to delete subscription');
      console.error('Error deleting subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getSubscriptionLogo = (subscription) => {
    return getLogoUrl(subscription);
  };

  const searchAvailableServices = (query) => {
    return subscriptionService.searchServices(query);
  };

  const getAvailableCategories = () => {
    return subscriptionService.getCategories();
  };

  const value = {
    ...state,
    setLoading,
    setSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    setError,
    setBudgetLimit,
    resetSubscriptions,
    loadMockData,
    fetchSubscriptions,
    saveSubscription,
    removeSubscription,
    getSubscriptionLogo,
    searchAvailableServices,
    getAvailableCategories
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