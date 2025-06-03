// Helper component to handle subscription filtering logic
const FilteredSubs = ({ subscriptions, searchTerm, filters }) => {
  const filteredSubscriptions = subscriptions.filter(sub => {
    // Search filter
    if (searchTerm && !sub.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category && sub.category !== filters.category) {
      return false;
    }

    // Importance filter
    if (filters.importance && sub.importance !== filters.importance) {
      return false;
    }

    // Status filter
    if (filters.status) {
      if (filters.status === 'active' && sub.isTrial) return false;
      if (filters.status === 'trial' && !sub.isTrial) return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
      const [min, max] = filters.priceRange.split('-').map(v => v === '+' ? Infinity : parseInt(v));
      
      if (filters.priceRange === '500+' && price < 500) return false;
      else if (max && (price < min || price > max)) return false;
    }

    // Billing cycle filter
    if (filters.billingCycle && sub.billingCycle !== filters.billingCycle) {
      return false;
    }

    return true;
  });

  return filteredSubscriptions;
};

export default FilteredSubs;