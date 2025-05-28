import React, { useState, useEffect } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import '../styles/Subscriptions.css'; 

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
    notes: ''
  });

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
    }
  }, [subscription]);

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

  const categories = [
    'Entertainment', 'Productivity', 'Business', 'Health & Fitness',
    'Education', 'News & Media', 'Cloud Storage', 'Software', 'Gaming', 'Other'
  ];

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
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Netflix, Spotify, Adobe"
                  className={errors.name ? 'error' : ''}
                />
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
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
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