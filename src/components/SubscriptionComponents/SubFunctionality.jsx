// Color mapping functions
export const getCategoryColor = (category) => {
  const colors = {
    'Entertainment': '#1f77b4',
    'Software': '#ff6b6b',
    'Productivity': '#e74c3c',
    'Cloud Storage': '#0077b5',
    'Education': '#27ae60',
    'Finance Tools': '#f39c12',
    'Professional': '#27ae60',
    'Gaming': '#9b59b6',
    'Health & Fitness': '#1abc9c',
    'News & Media': '#e67e22',
    'Business': '#34495e',
    'Other': '#95a5a6'
  };
  return colors[category] || '#3498db';
};

export const getTagColor = (category) => {
  const colors = {
    'Entertainment': '#e17055',
    'Software': '#f39c12',
    'Productivity': '#74b9ff',
    'Cloud Storage': '#a29bfe',
    'Education': '#00d2d3',
    'Finance Tools': '#f39c12',
    'Professional': '#27ae60',
    'Gaming': '#fd79a8',
    'Health & Fitness': '#55efc4',
    'News & Media': '#fab1a0',
    'Business': '#636e72',
    'Other': '#b2bec3'
  };
  return colors[category] || '#74b9ff';
};

// Filter function
export const filterSubscriptions = (subscriptions, searchTerm, filters) => {
  return subscriptions.filter(sub => {
    if (searchTerm && !sub.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.category && sub.category !== filters.category) return false;
    if (filters.importance && sub.importance !== filters.importance) return false;
    
    if (filters.status) {
      if (filters.status === 'active' && sub.isTrial) return false;
      if (filters.status === 'trial' && !sub.isTrial) return false;
    }
    
    if (filters.priceRange) {
      const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
      const [min, max] = filters.priceRange.split('-').map(v => v === '+' ? Infinity : parseInt(v));
      
      if (filters.priceRange === '500+' && price < 500) return false;
      else if (max && (price < min || price > max)) return false;
    }
    
    if (filters.billingCycle && sub.billingCycle !== filters.billingCycle) return false;
    
    return true;
  });
};