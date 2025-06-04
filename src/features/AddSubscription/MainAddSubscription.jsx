import React, { useState, useEffect, useRef } from 'react';
import { useSubscriptions } from '../../context/SubscriptionContext';
import { subscriptionService } from '../../utils/SubscriptionService';
import TabNavigation from './Sections/TabNavigation';
import BasicInfoTab from './Form/BasicInfoTab';
import DetailsUsageTab from './Form/DetailsUsageTab';
import ModalActions from './Sections/ModalActions';
import { validateForm } from './Validation/FormValidation';
import { FormHandler } from './Validation/FormHandler';
import '../../styles/Modals/Modal.css';
import '../../styles/Modals/ModalHeader.css';
import '../../styles/Modals/ModalFooter.css';
import '../../styles/Modals/AddSubForm/FormStyle.css';
import '../../styles/Modals/AddSubForm/SearchDropdown.css';
import '../../styles/Modals/AddSubForm/Tab.css';
import '../../styles/Modals/AddSubForm/ToggleSwitch.css';

const MainAddSubscription = ({ closeModal, subscription = null }) => {
  const { saveSubscription, loading } = useSubscriptions();

  // Initialize form with either edit data or clean slate
  // Handles both create and update scenarios through single component

  const [formData, setFormData] = useState(() => FormHandler.getInitialFormData(subscription));

  // Dynamic service search with 1+ character threshold
  // Balances responsiveness with API-like behavior simulation
  // Uses local state for search query and results
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);


  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');


  useEffect(() => {
    if (subscription) {
      setSearchQuery(subscription.name);
    }
  }, [subscription]);

  // Initialize form data with existing subscription if editing
  // Auto-populate form fields from predefined service data

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

  // Event handlers using FormHandler
  const handleInputChange = (e) => {
    FormHandler.handleInputChange(e, formData, setFormData, errors, setErrors);
  };

  const handleSearchChange = (e) => {
    FormHandler.handleSearchChange(e, setSearchQuery, setFormData, setSelectedService, errors, setErrors);
  };

  const handleServiceSelect = (service) => {
    FormHandler.handleServiceSelect(service, setSelectedService, setSearchQuery, setFormData, setShowDropdown, setSearchResults);
  };

  const handleSubmit = (e) => {
    FormHandler.handleSubmit(e, formData, subscription, validateForm, setErrors, saveSubscription, closeModal);
  };

  // Handles form submission with validation and service saving
  // Uses FormHandler for cleaner logic separation

  const categories = subscriptionService.getCategories();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{subscription ? 'Edit Subscription' : 'Add New Subscription'}</h2>
          <button className="close-button" onClick={closeModal}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === 'basic' && (
            <BasicInfoTab
              formData={formData}
              errors={errors}
              searchQuery={searchQuery}
              showDropdown={showDropdown}
              searchResults={searchResults}
              categories={categories}
              searchInputRef={searchInputRef}
              dropdownRef={dropdownRef}
              handleInputChange={handleInputChange}
              handleSearchChange={handleSearchChange}
              handleServiceSelect={handleServiceSelect}
              setShowDropdown={setShowDropdown}
            />
          )}

          {activeTab === 'details' && (
            <DetailsUsageTab
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            />
          )}

          <ModalActions
            closeModal={closeModal}
            loading={loading}
            isEditing={!!subscription}
          />
        </form>
      </div>
    </div>
  );
};

export default MainAddSubscription;