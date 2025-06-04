import { subscriptionService } from '../../../utils/SubscriptionService';

export class FormHandler {
  static handleInputChange = (e, formData, setFormData, errors, setErrors) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  static handleSearchChange = (e, setSearchQuery, setFormData, setSelectedService, errors, setErrors) => {
    const value = e.target.value;
    setSearchQuery(value);
    setFormData(prev => ({ ...prev, name: value }));
    setSelectedService(null);
    
    // Clear name error when typing
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  
  // Map service data structure to form field requirements
  // Transforms external data format to internal form schema
  static handleServiceSelect = (service, setSelectedService, setSearchQuery, setFormData, setShowDropdown, setSearchResults) => {
    setSelectedService(service);
    setSearchQuery(service.fullName);
    setFormData(prev => ({
      ...prev,
      name: service.fullName,
      cost: service.price.toString(),
      category: service.category,
      billingCycle: service.cycle === 'month' ? 'monthly' : 
                   service.cycle === 'year' ? 'yearly' : 
                   service.cycle === 'day' ? 'daily' : 'monthly',
      logo: service.logo
    }));
    setShowDropdown(false);
    setSearchResults([]);
  }; 
  
  
    // Normalize subscription data for form consumption
    // Handles both new entries and existing subscription edits
    // Ensures consistent data structure for all subscriptions

  static getInitialFormData = (subscription) => {
    if (!subscription) {
      return {
        name: '',
        cost: '',
        billingCycle: 'monthly',
        category: '',
        importance: 'Regular',
        usageHours: '',
        usageFrequency: 'weekly',
        isTrial: false,
        trialEndDate: '',
        renewalDate: '',
        notes: '',
        logo: ''
      };
    } 
    


    return {
      ...subscription,
      cost: subscription.price?.replace(/[^\d.]/g, '') || '',
      isTrial: subscription.isTrial || subscription.price === 'Free Trial'
    };
  };

  static handleSubmit = async (e, formData, subscription, validateForm, setErrors, saveSubscription, closeModal) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await saveSubscription({
        ...formData,
        id: subscription?.id
      });
      closeModal();
    } catch (error) {
      console.error('Error saving subscription:', error);
    }
  };
}