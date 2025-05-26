import React, { useState, useEffect } from 'react';
import AddSubscriptionModal from '../components/AddSubscriptionModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import '../App.css';

const Subscriptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  useEffect(() => {
    const savedSubscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    setSubscriptions(savedSubscriptions);
  }, []);

  const saveSubscription = (subscriptionData) => {
    let updatedSubscriptions;
    if (subscriptionData.id) {
      // Update existing subscription
      updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === subscriptionData.id ? { ...sub, ...subscriptionData } : sub
      );
    } else {
      // Add new subscription
      const newSubscription = { ...subscriptionData, id: Date.now() };
      updatedSubscriptions = [...subscriptions, newSubscription];
    }
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
    setEditingSubscription(null);
    closeModal();
  };

  const deleteSubscription = (id) => {
    const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== id);
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
    setDeleteConfirmationId(null);
  };

  const openModal = (subscription = null) => {
    setEditingSubscription(subscription);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubscription(null);
  };

  const handleActionClick = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (subscription) => {
    openModal(subscription);
    setOpenMenuId(null);
  };

  const handleDelete = (id) => {
    setDeleteConfirmationId(id);
    setOpenMenuId(null);
  };

  return (
    <div className="subscriptions-page">
      <h1>Subscriptions Page</h1>
      <button onClick={() => openModal()}>Add New Subscription</button>
      {isModalOpen && (
        <AddSubscriptionModal
          closeModal={closeModal}
          saveSubscription={saveSubscription}
          subscription={editingSubscription}
        />
      )}
      {deleteConfirmationId && (
        <DeleteConfirmationModal
          onConfirm={() => deleteSubscription(deleteConfirmationId)}
          onCancel={() => setDeleteConfirmationId(null)}
        />
      )}
      <div className="subscriptions-table">
        <table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Price</th>
              <th>Usage</th>
              <th>Importance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>
                  <img src={sub.logo} alt="logo" width="50" />
                </td>
                <td>{sub.name}</td>
                <td>R {sub.cost}</td>
                <td>{sub.usageHours} hours/{sub.usageFrequency}</td>
                <td
                  style={{
                    color:
                      sub.importance === 'Optional'
                        ? 'red'
                        : sub.importance === 'Regular'
                        ? 'yellow'
                        : 'blue',
                  }}
                >
                  {sub.importance}
                </td>
                <td>
                  <button onClick={() => handleActionClick(sub.id)}>Actions</button>
                  {openMenuId === sub.id && (
                    <div className="action-menu">
                      <button onClick={() => handleEdit(sub)}>Edit</button>
                      <button onClick={() => handleDelete(sub.id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscriptions;