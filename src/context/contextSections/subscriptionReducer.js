import mockSubscriptions from '../../utils/Mockdata';
// State management logic for subscription operations
// Handles calculations and state updates

// Initial state
// Define all possible state values and their defaults
// Centralizes action names to prevent typos
export const initialState = {
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
export const ActionTypes = {
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

// Helper functions
export const calculateTotalSpent = (subscriptions) => {
  return subscriptions.reduce((total, sub) => {
    const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || sub.cost || 0);
    return total + price;
  }, 0);
};

// Add up all subscription prices for total cost
// Removes R symbols and handles different price formats

export const calculateNewSubscriptions = (subscriptions) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Count how many subscriptions added this month
  // Used for dashboard "new this month" number
  
  return subscriptions.filter(sub => {
    if (!sub.dateAdded) return false;
    const subDate = new Date(sub.dateAdded);
    return subDate.getMonth() === currentMonth && subDate.getFullYear() === currentYear;
  }).length;
};

  // Find subscriptions that are free trials
  // Checks different ways trials might be marked

export const calculateFreeTrials = (subscriptions) => {
  return subscriptions.filter(sub => 
    sub.isTrial || sub.category === 'trial' || sub.price === 'Free Trial'
  ).length;
};

// Generate unique ID
export const generateId = () => {
  return Date.now() + Math.random();
};

// When subscription list changes, update all the counts
// Keeps dashboard numbers accurate
// Reducer function

export const subscriptionReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

      // Add new subscription and update all counts at same time
      // Prevents numbers from being wrong temporarily
    
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
    

      // Find and replace subscription while preserving array order
      // Its Recalculating the metrics after update
      
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

      // Replace current data with example subscriptions
      // Useful for testing and showing off the app
    
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