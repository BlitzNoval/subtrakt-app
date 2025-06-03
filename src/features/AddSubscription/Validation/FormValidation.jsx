// Validation rules for the subscription form
export const validateForm = (formData) => {
  const errors = {};

  // Required fields validation
  if (!formData.name.trim()) {
    errors.name = 'Subscription name is required';
  }

  if (!formData.cost || parseFloat(formData.cost) <= 0) {
    errors.cost = 'Cost must be greater than 0';
  }

  if (!formData.category.trim()) {
    errors.category = 'Category is required';
  }

  // Trial specific validation
  if (formData.isTrial && !formData.trialEndDate) {
    errors.trialEndDate = 'Trial end date is required for free trials';
  }

  // Usage hours validation
  if (formData.usageHours) {
    const hours = parseFloat(formData.usageHours);
    if (hours < 0 || hours > 168) {
      errors.usageHours = 'Usage hours must be between 0 and 168 (hours per week)';
    }
  }

  // Date validations
  if (formData.trialEndDate) {
    const trialEnd = new Date(formData.trialEndDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (trialEnd < today) {
      errors.trialEndDate = 'Trial end date cannot be in the past';
    }
  }

  if (formData.renewalDate) {
    const renewal = new Date(formData.renewalDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (renewal < today) {
      errors.renewalDate = 'Renewal date cannot be in the past';
    }
  }

  return errors;
};

// Helper function to format currency
export const formatCurrency = (value) => {
  const num = parseFloat(value);
  return isNaN(num) ? 'R 0.00' : `R ${num.toFixed(2)}`;
};

// Helper function to calculate monthly cost based on billing cycle
export const calculateMonthlyCost = (cost, billingCycle) => {
  const numCost = parseFloat(cost) || 0;
  
  switch (billingCycle) {
    case 'daily':
      return numCost * 30;
    case 'weekly':
      return numCost * 4.33; // Average weeks per month
    case 'yearly':
      return numCost / 12;
    case 'monthly':
    default:
      return numCost;
  }
};