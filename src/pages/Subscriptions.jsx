import React, { useState, useEffect, useRef } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import AddSubscriptionModal from '../components/AddSubscriptionModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import '../styles/Subscriptions.css';
import '../styles/App.css';


const Subscriptions = () => {
  const {
    subscriptions,
    loading,
    fetchSubscriptions,
    saveSubscription,
    removeSubscription
  } = useSubscriptions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const actionMenuRef = useRef(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveSubscription = async (subscriptionData) => {
    try {
      await saveSubscription(subscriptionData);
      setEditingSubscription(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving subscription:', error);
    }
  };

  const handleDeleteSubscription = async (id) => {
    try {
      await removeSubscription(id);
      setDeleteConfirmationId(null);
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
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

  if (loading && subscriptions.length === 0) {
    return (
      <div className="subscriptions-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="subscriptions-page">
      <div className="page-header">
        <h1>My Subscriptions</h1>
        <p>Manage all your subscription services in one place</p>
        <button className="add-subscription-btn" onClick={() => openModal()}>
          Add New Subscription
        </button>
      </div>

      {subscriptions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📱</div>
          <h3>No subscriptions yet</h3>
          <p>Start by adding your first subscription to track your monthly spending.</p>
          <button onClick={() => openModal()}>Add Your First Subscription</button>
        </div>
      ) : (
        <div className="subscriptions-table">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
                <th>Category</th>
                <th>Usage</th>
                <th>Importance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id}>
                  <td>
                    <div className="service-info">
                      <div className="service-logo">
                        <img 
                          src="https://via.placeholder.com/40x40/007bff/ffffff?text=📱" 
                          alt={`${sub.name} logo`} 
                          width="40" 
                          height="40"
                        />
                      </div>
                      <div className="service-details">
                        <strong>{sub.name}</strong>
                        <small>{sub.billingCycle || 'Monthly'}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="price">{sub.price}</span>
                  </td>
                  <td>
                    <span className="category-badge">{sub.category}</span>
                  </td>
                  <td>
                    {sub.usageHours ? (
                      <span>{sub.usageHours} hrs/{sub.usageFrequency || 'week'}</span>
                    ) : (
                      <span className="no-data">Not tracked</span>
                    )}
                  </td>
                  <td>
                    <span 
                      className={`importance-badge importance-${sub.importance?.toLowerCase()}`}
                    >
                      {sub.importance}
                    </span>
                  </td>
                  <td>
                    {sub.isTrial ? (
                      <span className="status-badge trial">Free Trial</span>
                    ) : (
                      <span className="status-badge active">Active</span>
                    )}
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="actions-btn"
                      onClick={() => handleActionClick(sub.id)}
                    >
                      ⋮
                    </button>
                    {openMenuId === sub.id && (
                      <div className="action-menu" ref={actionMenuRef}>
                        <button onClick={() => handleEdit(sub)}>
                          ✏️ Edit
                        </button>
                        <button onClick={() => handleDelete(sub.id)}>
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Cards */}
      <div className="subscription-summary">
        <div className="summary-card">
          <h3>Total Monthly Cost</h3>
          <div className="summary-value">
            R{subscriptions.reduce((total, sub) => {
              const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
              return total + price;
            }, 0).toFixed(2)}
          </div>
        </div>
        <div className="summary-card">
          <h3>Active Subscriptions</h3>
          <div className="summary-value">{subscriptions.length}</div>
        </div>
        <div className="summary-card">
          <h3>Free Trials</h3>
          <div className="summary-value">
            {subscriptions.filter(sub => sub.isTrial).length}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <AddSubscriptionModal
          closeModal={closeModal}
          saveSubscription={handleSaveSubscription}
          subscription={editingSubscription}
        />
      )}
      
      {deleteConfirmationId && (
        <DeleteConfirmationModal
          onConfirm={() => handleDeleteSubscription(deleteConfirmationId)}
          onCancel={() => setDeleteConfirmationId(null)}
        />
      )}
    </div>
  );
};

export default Subscriptions;