import React from 'react';
import MainAddSubscription from '../features/AddSubscription/MainAddSubscription';

// Wrapper component that renders the main subscription form modal
// Provides a clean interface for the modal system

const AddSubscriptionModal = ({ closeModal, subscription = null }) => {
  return <MainAddSubscription closeModal={closeModal} subscription={subscription} />;
};

export default AddSubscriptionModal;