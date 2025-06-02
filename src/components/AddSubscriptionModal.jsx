import React, { useState, useEffect, useRef } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { subscriptionService } from '../utils/SubscriptionService';
import '../styles/Subscriptions/Subscriptions.css'; 
import '../styles/Modals/Modal.css'; 
import '../styles/Modals/ModalFooter.css';
import '../styles/Modals/ModalHeader.css';
import '../styles/Modals/AddSubForm/FormStyle.css';
import '../styles/Modals/AddSubForm/SearchDropdown.css';
import '../styles/Modals/AddSubForm/Tab.css';
import '../styles/Modals/AddSubForm/ToggleSwitch.css';

const AddSubscriptionModal = ({ closeModal, subscription = null }) => {
  const { saveSubscription, loading } = useSubscriptions();

  // Form data state
  const [formData, setFormData] = useState({
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
  });

  // Search and dropdown states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Validation errors state
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');

  // Pre-fill form if editing existing subscription
  useEffect(() => {
    if (subscription) {
      setFormData({
        ...subscription,
        cost: subscription.price?.replace(/[^\d.]/g, '') || '',
        isTrial: subscription.isTrial || subscription.price === 'Free Trial'
      });
      setSearchQuery(subscription.name);
    }
  }, [subscription]);

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.length >= 1) {
      const results = subscriptionService.searchServices(searchQuery);
      setSearchResults(results);
      setShowDropdown(results.length > 0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required';
    }

    if (!formData.cost || formData.cost <= 0) {
      newErrors.cost = 'Cost must be greater than 0';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    // Trial specific validation
    if (formData.isTrial && !formData.trialEndDate) {
      newErrors.trialEndDate = 'Trial end date is required for free trials';
    }

    // Usage validation
    if (formData.usageHours && (formData.usageHours < 0 || formData.usageHours > 168)) {
      newErrors.usageHours = 'Usage hours must be between 0 and 168 (hours per week)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setFormData(prev => ({ ...prev, name: value }));
    setSelectedService(null);
    
    // Clear name error when typing
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleServiceSelect = (service) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
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

  const categories = subscriptionService.getCategories();

  const importanceLevels = [
    { value: 'Critical', color: '#2563eb', description: 'Essential for work/life' },
    { value: 'Regular', color: '#f59e0b', description: 'Important but not critical' },
    { value: 'Optional', color: '#ef4444', description: 'Nice to have' }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{subscription ? 'Edit Subscription' : 'Add New Subscription'}</h2>
          <button className="close-button" onClick={closeModal}>✕</button>
        </div>

        {/* Tab Navigation */}
        <div className="tab-nav">
          <span
            className={activeTab === 'basic' ? 'active-tab' : ''}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </span>
          <span
            className={activeTab === 'details' ? 'active-tab' : ''}
            onClick={() => setActiveTab('details')}
          >
            Details & Usage
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="tab-content">
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
                  
                  {/* Search Results Dropdown */}
                  {showDropdown && searchResults.length > 0 && (
                    <div 
                      ref={dropdownRef}
                      className="search-dropdown"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        zIndex: 1000,
                        maxHeight: '200px',
                        overflowY: 'auto'
                      }}
                    >
                      {searchResults.map((service, index) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceSelect(service)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px',
                            cursor: 'pointer',
                            borderBottom: index < searchResults.length - 1 ? '1px solid #f3f4f6' : 'none',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#f9fafb'}
                          onMouseLeave={(e) => e.target.style.background = 'white'}
                        >
                          <img
                            src={subscriptionService.getLogoUrl(service)}
                            alt={service.name}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              marginRight: '12px',
                              objectFit: 'cover'
                            }}
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(service.name)}&background=74b9ff&color=fff&size=32`;
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', fontSize: '14px', color: '#2c3e50' }}>
                              {service.fullName}
                            </div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                              {subscriptionService.formatPrice(service)} • {service.category}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

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
          )}

          {/* Details & Usage Tab */}
          {activeTab === 'details' && (
            <div className="tab-content">
              <div className="form-group">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    name="isTrial"
                    checked={formData.isTrial}
                    onChange={handleInputChange}
                  />
                  <span className="toggle-slider"></span>
                  This is a free trial
                </label>
              </div>

              {formData.isTrial && (
                <div className="form-group">
                  <label htmlFor="trialEndDate">Trial End Date *</label>
                  <input
                    type="date"
                    id="trialEndDate"
                    name="trialEndDate"
                    value={formData.trialEndDate}
                    onChange={handleInputChange}
                    className={errors.trialEndDate ? 'error' : ''}
                  />
                  {errors.trialEndDate && <span className="error-message">{errors.trialEndDate}</span>}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="usageHours">Usage Hours (per week)</label>
                  <input
                    type="number"
                    id="usageHours"
                    name="usageHours"
                    value={formData.usageHours}
                    onChange={handleInputChange}
                    placeholder="e.g., 10"
                    min="0"
                    max="168"
                    className={errors.usageHours ? 'error' : ''}
                  />
                  {errors.usageHours && <span className="error-message">{errors.usageHours}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="usageFrequency">Usage Frequency</label>
                  <select
                    id="usageFrequency"
                    name="usageFrequency"
                    value={formData.usageFrequency}
                    onChange={handleInputChange}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="rarely">Rarely</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="renewalDate">Next Renewal Date</label>
                <input
                  type="date"
                  id="renewalDate"
                  name="renewalDate"
                  value={formData.renewalDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional notes about this subscription..."
                  rows="3"
                />
              </div>
            </div>
          )}

          <div className="modal-footer">
            <button type="button" onClick={closeModal} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="primary-button">
              {loading ? 'Saving...' : (subscription ? 'Update' : 'Add')} Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscriptionModal;