import React, { useState, useEffect } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import AddSubscriptionModal from '../components/AddSubscriptionModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import SearchFilter from '../components/SearchFilter';
import SubscriptionRow from '../components/SubscriptionComponents/SubRow';
import MetricsSidebar from '../components/SubscriptionComponents/MetricsBar';
import { 
  filterSubscriptions, 
  getCategoryColor, 
  getTagColor 
} from '../components/SubscriptionComponents/SubFunctionality';
import '../styles/Subscription/Subscriptions.css';

const Subscriptions = () => {
  const { subscriptions, loading, fetchSubscriptions, saveSubscription, removeSubscription } = useSubscriptions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    importance: '',
    status: '',
    priceRange: '',
    billingCycle: ''
  });

  useEffect(() => fetchSubscriptions(), []);

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

  // Calculate metrics
  const totalMonthlySpent = subscriptions.reduce((total, sub) => 
    total + parseFloat(sub.price?.replace(/[^\d.]/g, '') || 0), 0);
  const activeSubscriptions = subscriptions.filter(sub => !sub.isTrial).length;
  const freeTrials = subscriptions.filter(sub => sub.isTrial).length;

  // Filter subscriptions
  const filteredSubscriptions = filterSubscriptions(
    subscriptions, 
    searchTerm, 
    filters
  );

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
        <div className="page-header-content">
          <h1>My Subscriptions</h1>
          <p>Manage all your subscription services in one place</p>
        </div>
        <button className="add-subscription-btn" onClick={() => openModal()}>
          Add New Subscription
        </button>
      </div>

      <SearchFilter
        onSearch={setSearchTerm}
        onFilter={setFilters}
        categories={[...new Set(subscriptions.map(sub => sub.category))].filter(Boolean)}
        importanceLevels={['Critical', 'Regular', 'Optional']}
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
                        <SubscriptionRow
                          key={sub.id}
                          sub={sub}
                          onEdit={openModal}
                          onDelete={setDeleteConfirmationId}
                          getCategoryColor={getCategoryColor}
                          getTagColor={getTagColor}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <MetricsSidebar
              totalMonthlySpent={totalMonthlySpent}
              activeSubscriptions={activeSubscriptions}
              freeTrials={freeTrials}
            />
          </>
        )}
      </div>

      {isModalOpen && (
        <AddSubscriptionModal
          closeModal={() => setIsModalOpen(false)}
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