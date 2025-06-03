import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSubscriptions } from '../../context/SubscriptionContext';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import AddSubscriptionModal from '../../components/AddSubscriptionModal';
import SubscriptionInfo from './SubscriptionInfo';
import QuickActions from './AddOns/QuickActions';
import RelatedSubscriptions from './AddOns/RelatedSubscriptions';
import '../../styles/SubscriptionDetails/SubscriptionDetails.css';
import '../../styles/SubscriptionDetails/DarkDetails.css';

const MainSubscriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { subscriptions, removeSubscription, saveSubscription, getSubscriptionLogo } = useSubscriptions();
  
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [relatedSubscriptions, setRelatedSubscriptions] = useState([]);

  useEffect(() => {
    const loadSubscription = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const found = subscriptions.find(sub => sub.id === parseInt(id));
      if (found) {
        setSubscription(found);
        const related = subscriptions
          .filter(sub => sub.category === found.category && sub.id !== found.id)
          .slice(0, 3);
        setRelatedSubscriptions(related);
      }
      setLoading(false);
    };
    
    loadSubscription();
  }, [id, subscriptions]);

  const handleDelete = async () => {
    await removeSubscription(parseInt(id));
    navigate('/subscriptions');
  };

  const handleSaveEdit = async (updatedData) => {
    await saveSubscription(updatedData);
    setShowEditModal(false);
  };

  if (loading) {
    return (
      <div className="subscription-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="subscription-detail-page">
        <div className="not-found">
          <h2>Subscription Not Found</h2>
          <p>The subscription you're looking for doesn't exist.</p>
          <Link to="/subscriptions" className="back-link">← Back to Subscriptions</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-detail-page">
      <div className="detail-header">
        <Link to="/subscriptions" className="back-link">← Back to Subscriptions</Link>
        <div className="header-actions">
          <button className="edit-btn" onClick={() => setShowEditModal(true)}>✏️ Edit</button>
          <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>🗑️ Delete</button>
        </div>
      </div>

      <div className="detail-content">
        <div className="main-info-section">
          <SubscriptionInfo subscription={subscription} getSubscriptionLogo={getSubscriptionLogo} />
        </div>

        <div className="sidebar-section">
          <QuickActions subscription={subscription} navigate={navigate} />
          {relatedSubscriptions.length > 0 && (
            <RelatedSubscriptions 
              relatedSubscriptions={relatedSubscriptions} 
              getSubscriptionLogo={getSubscriptionLogo}
            />
          )}
        </div>
      </div>

      {showDeleteModal && (
        <DeleteConfirmationModal onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)} />
      )}

      {showEditModal && (
        <AddSubscriptionModal
          closeModal={() => setShowEditModal(false)}
          saveSubscription={handleSaveEdit}
          subscription={subscription}
        />
      )}
    </div>
  );
};

export default MainSubscriptionDetail;