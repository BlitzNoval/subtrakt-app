import { subscriptionService } from '../../utils/SubscriptionService';
import { ActionTypes, generateId } from './subscriptionReducer';

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

export const subscriptionActions = (dispatch, state) => {
  // Basic dispatchers
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

  return {
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
};