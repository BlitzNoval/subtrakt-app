import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscriptions } from '../../context/SubscriptionContext';
import AddSubscriptionModal from '../../components/AddSubscriptionModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import SearchFilter from '../../components/SearchFilter';
import SubscriptionsTable from './SubscriptionsTable';
import MetricsCards from './Visuals/MetricsCards';
import EmptyState from './Visuals/EmptyState';
import FilteredSubscriptions from './Visuals/FilterSubs';
import '../../styles/Subscriptions/Subscriptions.css';
import '../../styles/App.css';

const MainSubscriptions = () => {
  const navigate = useNavigate();
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '', importance: '', status: '', priceRange: '', billingCycle: ''
  });
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      setPageLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
      fetchSubscriptions();
      setPageLoading(false);
    };
    loadPage();
  }, []);

  // Dual Handler for both create and update operations
  // Maintains consistent state management across CRUD operations

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

  // Apply search and filter criteria to subscription dataset
  // Separates filtering logic from display logic for reusability
  // Im having alot of fun L:

  const openModal = (subscription = null) => {
    setEditingSubscription(subscription);
    setIsModalOpen(true);
  };

  // Get filtered subscriptions
  const filteredSubscriptions = FilteredSubscriptions({ subscriptions, searchTerm, filters });

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

  // Render the main subscriptions page with all components
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
        categories={categories}
        importanceLevels={importanceLevels}
      />

      <div className="subscriptions-content">
        {subscriptions.length === 0 ? (
          <EmptyState onAddClick={() => openModal()} />
        ) : (
          <>
            <SubscriptionsTable
              subscriptions={filteredSubscriptions}
              getSubscriptionLogo={getSubscriptionLogo}
              onEdit={openModal}
              onDelete={setDeleteConfirmationId}
              navigate={navigate}
            />
            <MetricsCards subscriptions={subscriptions} />
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

export default MainSubscriptions;