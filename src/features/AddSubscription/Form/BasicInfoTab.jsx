import React from 'react';
import ServiceSearchDropdown from './ServiceSearchDropdown';

const BasicInfoTab = ({
  formData,
  errors,
  searchQuery,
  showDropdown,
  searchResults,
  categories,
  searchInputRef,
  dropdownRef,
  handleInputChange,
  handleSearchChange,
  handleServiceSelect,
  setShowDropdown
}) => {
  const importanceLevels = [
    { value: 'Critical', color: '#2563eb', description: 'Essential for work/life' },
    { value: 'Regular', color: '#f59e0b', description: 'Important but not critical' },
    { value: 'Optional', color: '#ef4444', description: 'Nice to have' }
  ];

  return (
    <div className="tab-content">
      {/* Subscription Name Search */}
      <div className="form-group">
        <label htmlFor="name">Subscription Name *</label>
        <div className="search-container" style={{ position: 'relative' }}>
          <input
            ref={searchInputRef}
            type="text"
            id="name"
            name="name"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
            placeholder="Search for a service (e.g., Netflix, Spotify...)"
            className={errors.name ? 'error' : ''}
            autoComplete="off"
          />
          {showDropdown && searchResults.length > 0 && (
            <ServiceSearchDropdown
              searchResults={searchResults}
              dropdownRef={dropdownRef}
              handleServiceSelect={handleServiceSelect}
            />
          )}
        </div>
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      {/* Cost and Billing Cycle */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cost">Monthly Cost (R) *</label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={formData.cost}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={errors.cost ? 'error' : ''}
          />
          {errors.cost && <span className="error-message">{errors.cost}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="billingCycle">Billing Cycle</label>
          <select
            id="billingCycle"
            name="billingCycle"
            value={formData.billingCycle}
            onChange={handleInputChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Category */}
      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={errors.category ? 'error' : ''}
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="error-message">{errors.category}</span>}
      </div>

      {/* Importance Level */}
      <div className="form-group">
        <label>Importance Level</label>
        <div className="importance-options">
          {importanceLevels.map(level => (
            <label key={level.value} className="importance-option">
              <input
                type="radio"
                name="importance"
                value={level.value}
                checked={formData.importance === level.value}
                onChange={handleInputChange}
              />
              <span 
                className="importance-label" 
                style={{ borderColor: level.color }}
              >
                {level.value}
              </span>
              <small>{level.description}</small>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoTab;