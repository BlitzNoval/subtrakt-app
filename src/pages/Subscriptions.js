import React, { useState, useEffect, useRef } from 'react';
import AddSubscriptionModal from '../components/AddSubscriptionModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import '../App.css';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const actionMenuRef = useRef(null); // Ref to track the action menu

  useEffect(() => {
    fetch('http://localhost:3001/subscriptions')
      .then(response => response.json())
      .then(data => setSubscriptions(data))
      .catch(error => console.error('Error fetching subscriptions:', error));
  }, []);

  useEffect(() => {
    // Add event listener to detect clicks outside the action menu
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setOpenMenuId(null); // Close the menu if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside); // Cleanup
  }, []); // Empty dependency array means it runs once on mount and unmount

  const saveSubscription = (subscriptionData) => {
    const method = subscriptionData.id ? 'PUT' : 'POST';
    const url = subscriptionData.id ? `http://localhost:3001/subscriptions/${subscriptionData.id}` : 'http://localhost:3001/subscriptions';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...subscriptionData,
        price: `R ${subscriptionData.cost}`, // Ensure price format matches
      }),
    })
      .then(response => response.json())
      .then(() => {
        fetch('http://localhost:3001/subscriptions')
          .then(response => response.json())
          .then(data => {
            setSubscriptions(data);
            setEditingSubscription(null);
            setIsModalOpen(false);
          });
      })
      .catch(error => console.error('Error saving subscription:', error));
  };

  const deleteSubscription = (id) => {
    fetch(`http://localhost:3001/subscriptions/${id}`, { method: 'DELETE' })
      .then(() => {
        setSubscriptions(subscriptions.filter(sub => sub.id !== id));
        setDeleteConfirmationId(null);
      })
      .catch(error => console.error('Error deleting subscription:', error));
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
                  <img src="https://via.placeholder.com/50" alt="logo" width="50" />
                </td>
                <td>{sub.name}</td>
                <td>{sub.price}</td>
                <td>{sub.usageHours} hours/{sub.usageFrequency || 'N/A'}</td>
                <td style={{ color: sub.importance === 'Optional' ? 'red' : sub.importance === 'Regular' ? 'yellow' : 'blue' }}>
                  {sub.importance}
                </td>
                <td>
                  <button onClick={() => handleActionClick(sub.id)}>Actions</button>
                  {openMenuId === sub.id && (
                    <div className="action-menu" ref={actionMenuRef}>
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