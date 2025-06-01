import React, { useState, useEffect, useRef } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import AddSubscriptionModal from '../components/AddSubscriptionModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import SearchFilter from '../components/SearchFilter.jsx';
import '../styles/Subscriptions.css';
import '../styles/Modal.css';
import '../styles/Subscriptions.css';
import '../styles/App.css';

const Subscriptions = () => {
  const {
    subscriptions,
    loading,
    fetchSubscriptions,
    saveSubscription,
    removeSubscription,
    getSubscriptionLogo
  } = useSubscriptions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    importance: '',
    status: '',
    priceRange: '',
    billingCycle: ''
  });
  const [pageLoading, setPageLoading] = useState(true);
  const actionMenuRef = useRef(null);

  useEffect(() => {
    // Simulate page loading
    const loadPage = async () => {
      setPageLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
      fetchSubscriptions();
      setPageLoading(false);
    };
    
    loadPage();
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

  // Calculate metrics from real data
  const totalMonthlySpent = subscriptions.reduce((total, sub) => {
    const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
    return total + price;
  }, 0);

  const activeSubscriptions = subscriptions.filter(sub => !sub.isTrial).length;
  const freeTrials = subscriptions.filter(sub => sub.isTrial).length;

  // Get service initials for logo
  const getServiceInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Get service color based on category - consistent with Dashboard
  const getCategoryColor = (category) => {
    const colors = {
      'Entertainment': '#1f77b4',
      'Software': '#ff6b6b',
      'Productivity': '#e74c3c',
      'Cloud Storage': '#0077b5',
      'Education': '#27ae60',
      'Finance Tools': '#f39c12',
      'Professional': '#27ae60',
      'Gaming': '#9b59b6',
      'Health & Fitness': '#1abc9c',
      'News & Media': '#e67e22',
      'Business': '#34495e',
      'Developer Tools': '#8e44ad',
      'Car Subscriptions': '#2c3e50',
      'Mobile Data': '#16a085',
      'Other': '#95a5a6'
    };
    return colors[category] || '#3498db';
  };

  // Get tag color based on category - consistent with Dashboard
  const getTagColor = (category) => {
    const colors = {
      'Entertainment': '#e17055',
      'Software': '#f39c12',
      'Productivity': '#74b9ff',
      'Cloud Storage': '#a29bfe',
      'Education': '#00d2d3',
      'Finance Tools': '#f39c12',
      'Professional': '#27ae60',
      'Gaming': '#fd79a8',
      'Health & Fitness': '#55efc4',
      'News & Media': '#fab1a0',
      'Business': '#636e72',
      'Developer Tools': '#e84393',
      'Car Subscriptions': '#2d3436',
      'Mobile Data': '#00b894',
      'Other': '#b2bec3'
    };
    return colors[category] || '#74b9ff';
  };

  // Filter subscriptions based on search and filters
  const filteredSubscriptions = subscriptions.filter(sub => {
    // Search filter
    if (searchTerm && !sub.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters.category && sub.category !== filters.category) {
      return false;
    }

    // Importance filter
    if (filters.importance && sub.importance !== filters.importance) {
      return false;
    }

    // Status filter
    if (filters.status) {
      if (filters.status === 'active' && sub.isTrial) return false;
      if (filters.status === 'trial' && !sub.isTrial) return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const price = parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0);
      const [min, max] = filters.priceRange.split('-').map(v => v === '+' ? Infinity : parseInt(v));
      
      if (filters.priceRange === '500+' && price < 500) return false;
      else if (max && (price < min || price > max)) return false;
    }

    // Billing cycle filter
    if (filters.billingCycle && sub.billingCycle !== filters.billingCycle) {
      return false;
    }

    return true;
  });

  // Get unique categories and importance levels for filters
  const categories = [...new Set(subscriptions.map(sub => sub.category))].filter(Boolean);
  const importanceLevels = ['Critical', 'Regular', 'Optional'];

  if (pageLoading || (loading && subscriptions.length === 0)) {
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
        <div className="page-header-content">
          <h1>My Subscriptions</h1>
          <p>Manage all your subscription services in one place</p>
        </div>
        <button className="add-subscription-btn" onClick={() => openModal()}>
          Add New Subscription
        </button>
      </div>

      {/* Search and Filter Bar */}
      <SearchFilter
        onSearch={setSearchTerm}
        onFilter={setFilters}
        categories={categories}
        importanceLevels={importanceLevels}
      />

      <div className="subscriptions-content">
        {subscriptions.length === 0 ? (
          <div className="table-container">
            <div className="empty-state">
              <div className="empty-icon">📱</div>
              <h3>No subscriptions yet</h3>
              <p>Start by adding your first subscription to track your monthly spending.</p>
              <button onClick={() => openModal()}>Add Your First Subscription</button>
            </div>
          </div>
        ) : (
          <>
            <div className="table-container">
              <div className="subscriptions-table">
                <div className="table-wrapper">
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
                      {filteredSubscriptions.map((sub) => (
                        <tr key={sub.id}>
                          <td>
                            <div className="service-info">
                              <div className="service-logo" style={{ 
                                background: 'transparent',
                                padding: '0'
                              }}>
                                <img
                                  src={getSubscriptionLogo(sub)}
                                  alt={sub.name}
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    objectFit: 'cover'
                                  }}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div 
                                  style={{
                                    display: 'none',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    background: getCategoryColor(sub.category),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '16px'
                                  }}
                                >
                                  {getServiceInitials(sub.name)}
                                </div>
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
                            <span className="category-badge" style={{ 
                              backgroundColor: getTagColor(sub.category),
                              color: 'white'
                            }}>{sub.category}</span>
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
              </div>
            </div>

            <div className="metrics-sidebar">
              <div className="metric-card total-cost">
                
                <div className="metric-label">Total Monthly Cost</div>
                <div className="metric-value">R{totalMonthlySpent.toFixed(2)}</div>
              </div>

              <div className="metric-card active-count">
                
                <div className="metric-label">Active Subscriptions</div>
                <div className="metric-value">{activeSubscriptions}</div>
              </div>

              <div className="metric-card trials-count">
              
                <div className="metric-label">Free Trials</div>
                <div className="metric-value">{freeTrials}</div>
              </div>
            </div>
          </>
        )}
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