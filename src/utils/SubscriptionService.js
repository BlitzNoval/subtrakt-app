// src/utils/subscriptionService.js
import subscriptionData from '../data/subscriptions.json';

export class SubscriptionService {
  constructor() {
    this.data = subscriptionData;
    this.flattenedServices = this.flattenServices();
  }

  // Flatten the nested data structure for easier searching
  flattenServices() {
    const flattened = [];
    
    Object.keys(this.data).forEach(category => {
      this.data[category].forEach(service => {
        service.tiers.forEach(tier => {
          flattened.push({
            id: `${service.name}-${tier.name}`.toLowerCase().replace(/\s+/g, '-'),
            name: service.name,
            tierName: tier.name,
            fullName: `${service.name} - ${tier.name}`,
            logo: service.logo,
            price: tier.price,
            currency: tier.currency,
            cycle: tier.cycle,
            category: category,
            searchableText: `${service.name} ${tier.name} ${category}`.toLowerCase()
          });
        });
      });
    });
    
    return flattened;
  }

  // Search services by name with fuzzy matching
  searchServices(query) {
    if (!query || query.length < 1) {
      return [];
    }

    const searchQuery = query.toLowerCase();
    const results = this.flattenedServices.filter(service => 
      service.searchableText.includes(searchQuery)
    );

    // Sort by relevance (exact name matches first, then partial matches)
    return results.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(searchQuery);
      const bNameMatch = b.name.toLowerCase().includes(searchQuery);
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      // If both match, sort by price (ascending)
      return a.price - b.price;
    }).slice(0, 10); // Limit to 10 results
  }

  // Get service by exact name match
  getServiceByName(name) {
    return this.flattenedServices.find(service => 
      service.name.toLowerCase() === name.toLowerCase()
    );
  }

  // Get all categories
  getCategories() {
    return Object.keys(this.data);
  }

  // Get services by category
  getServicesByCategory(category) {
    return this.flattenedServices.filter(service => 
      service.category === category
    );
  }

  // Format price for display
  formatPrice(service) {
    if (typeof service.price === 'string') {
      return service.price;
    }
    
    const cycleText = {
      'month': '/mo',
      'year': '/yr',
      'day': '/day',
      'quarter': '/qtr'
    };
    
    return `R${service.price}${cycleText[service.cycle] || ''}`;
  }

  // Get logo URL with fallback
  getLogoUrl(service) {
    return service.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(service.name)}&background=74b9ff&color=fff&size=40`;
  }
}

// Create singleton instance
export const subscriptionService = new SubscriptionService();