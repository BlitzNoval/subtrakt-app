import React from 'react';
import MainAddSubscription from '../features/AddSubscription/MainAddSubscription';

const AddSubscriptionModal = ({ closeModal, subscription = null }) => {
  return <MainAddSubscription closeModal={closeModal} subscription={subscription} />;
};

export default AddSubscriptionModal;