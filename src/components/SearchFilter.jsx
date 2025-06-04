import React, { useState } from 'react';
import '../styles/Global/Search.css';
import '../styles/Global/Filter.css';

const SearchFilter = ({ onSearch, onFilter, categories, importanceLevels }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    importance: '',
    status: '',
    priceRange: '',
    billingCycle: ''
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  {
   /* Warning icon and confirmation UI - designed for accessibility
  // Update filters and maintain state synchronization
  // Ensures filter persistence across page navigation
  // Its instant which was important , but since there is no data set there has to be fake load times*/
   }

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      importance: '',
      status: '',
      priceRange: '',
      billingCycle: ''
    });
    onFilter({
      category: '',
      importance: '',
      status: '',
      priceRange: '',
      billingCycle: ''
    });
  };

  // Count active filters 
  // Calculate active filters for visual indicator
  // Provides user feedback on applied filter state
  // Enhances user experience by showing active filters

  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="search-filter-container">
      <div className="search-filter-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search subscriptions by name..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
        </div>
        
 <button 
  className={`filter-button ${showFilters ? 'active' : ''}`}
  onClick={() => setShowFilters(!showFilters)}
>
  <img 
    src="/images/Filter.png" 
    alt="Filter Icon"
    className="filter-icon"
  />
  Filter
  {activeFilterCount > 0 && (
    <span className="filter-count">{activeFilterCount}</span>
  )}
</button>


      </div>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-grid">
            {/* Category Filter */}
            <div className="filter-group">
              <label>Category</label>
              <select 
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Importance Filter */}
            <div className="filter-group">
              <label>Importance</label>
              <select 
                value={filters.importance}
                onChange={(e) => handleFilterChange('importance', e.target.value)}
              >
                <option value="">All Levels</option>
                {importanceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="filter-group">
              <label>Status</label>
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="trial">Free Trial</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label>Price Range</label>
              <select 
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="0-50">R0 - R50</option>
                <option value="50-100">R50 - R100</option>
                <option value="100-200">R100 - R200</option>
                <option value="200-500">R200 - R500</option>
                <option value="500+">R500+</option>
              </select>
            </div>

            {/* Billing Cycle Filter */}
            <div className="filter-group">
              <label>Billing Cycle</label>
              <select 
                value={filters.billingCycle}
                onChange={(e) => handleFilterChange('billingCycle', e.target.value)}
              >
                <option value="">All Cycles</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;