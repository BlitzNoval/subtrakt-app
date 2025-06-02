import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSubscriptions } from '../context/SubscriptionContext';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import AddSubscriptionModal from '../components/AddSubscriptionModal';
import '../styles/SubscriptionDetails/ActionDetails.css';
import '../styles/SubscriptionDetails/DarkDetails.css';
import '../styles/SubscriptionDetails/PricingDetails.css';
import '../styles/SubscriptionDetails/RelatedServicesDetails.css';
import '../styles/SubscriptionDetails/SubscriptionDetails.css';
import '../styles/SubscriptionDetails/UsageDetails.css';

const SubscriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    subscriptions, 
    removeSubscription, 
    getSubscriptionLogo,
    saveSubscription 
  } = useSubscriptions();
  
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [relatedSubscriptions, setRelatedSubscriptions] = useState([]);

  useEffect(() => {
    // Simulate loading delay
    const loadSubscription = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const found = subscriptions.find(sub => sub.id === parseInt(id));
      if (found) {
        setSubscription(found);
        // Find related subscriptions in the same category
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

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedData) => {
    await saveSubscription(updatedData);
    setShowEditModal(false);
  };

  // Calculate subscription analytics
  const getSubscriptionAnalytics = () => {
    if (!subscription) return {};
    
    const monthlyPrice = parseFloat(subscription.price?.replace(/[^\d.]/g, '') || 0);
    const yearlyPrice = monthlyPrice * 12;
    const dailyPrice = monthlyPrice / 30;
    
    // Usage value calculation
    const monthlyHours = subscription.usageHours ? 
      (subscription.usageFrequency === 'daily' ? parseInt(subscription.usageHours) * 30 :
       subscription.usageFrequency === 'weekly' ? parseInt(subscription.usageHours) * 4 :
       parseInt(subscription.usageHours)) : 0;
    
    // Days until renewal
    const daysUntilRenewal = subscription.renewalDate ? 
      Math.ceil((new Date(subscription.renewalDate) - new Date()) / (1000 * 60 * 60 * 24)) : null;
    
    // Subscription age
    const subscriptionAge = subscription.dateAdded ? 
      Math.floor((new Date() - new Date(subscription.dateAdded)) / (1000 * 60 * 60 * 24)) : 0;
    
    return {
      yearlyPrice,
      dailyPrice,
      monthlyHours,
      daysUntilRenewal,
      subscriptionAge
    };
  };

  const analytics = getSubscriptionAnalytics();

  // Get importance color
  const getImportanceColor = (importance) => {
    const colors = {
      'Critical': '#2563eb',
      'Regular': '#f59e0b',
      'Optional': '#ef4444'
    };
    return colors[importance] || '#6b7280';
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Entertainment': '#e17055',
      'Software': '#f39c12',
      'Productivity': '#74b9ff',
      'Cloud Storage': '#a29bfe',
      'Education': '#00d2d3',
      'Gaming': '#fd79a8',
      'Health & Fitness': '#55efc4',
      'News & Media': '#fab1a0',
      'Developer Tools': '#e84393'
    };
    return colors[category] || '#74b9ff';
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
          <Link to="/subscriptions" className="back-link">
            ← Back to Subscriptions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-detail-page">
      {/* Header */}
      <div className="detail-header">
        <Link to="/subscriptions" className="back-link">
          ← Back to Subscriptions
        </Link>
        <div className="header-actions">
          <button className="edit-btn" onClick={handleEdit}>
            ✏️ Edit
          </button>
          <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="detail-content">
        {/* Left Column - Main Info */}
        <div className="main-info-section">
          {/* Service Card */}
          <div className="service-card">
            <div className="service-header">
              <img
                src={getSubscriptionLogo(subscription)}
                alt={subscription.name}
                className="service-logo-large"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(subscription.name)}&background=74b9ff&color=fff&size=80`;
                }}
              />
              <div className="service-title">
                <h1>{subscription.name}</h1>
                <div className="service-meta">
                  <span 
                    className="category-badge"
                    style={{ backgroundColor: getCategoryColor(subscription.category) }}
                  >
                    {subscription.category}
                  </span>
                  <span 
                    className="importance-badge"
                    style={{ 
                      backgroundColor: `${getImportanceColor(subscription.importance)}20`,
                      color: getImportanceColor(subscription.importance),
                      border: `1px solid ${getImportanceColor(subscription.importance)}`
                    }}
                  >
                    {subscription.importance}
                  </span>
                  {subscription.isTrial && (
                    <span className="trial-badge">Free Trial</span>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="pricing-section">
              <div className="price-main">
                <span className="price-amount">{subscription.price}</span>
                <span className="price-period">/{subscription.billingCycle || 'month'}</span>
              </div>
              <div className="price-breakdown">
                <div className="price-item">
                  <span className="price-label">Daily</span>
                  <span className="price-value">R{analytics.dailyPrice.toFixed(2)}</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Yearly</span>
                  <span className="price-value">R{analytics.yearlyPrice.toFixed(2)}</span>
                </div>
                {analytics.costPerHour > 0 && (
                  <div className="price-item">
                    <span className="price-label">Per Hour</span>
                    <span className="price-value">R{analytics.costPerHour.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Usage Stats */}
            {subscription.usageHours && (
              <div className="usage-stats-section">
                <h3>Usage Statistics</h3>
                <div className="usage-grid">
                  <div className="usage-stat">
                    <span className="stat-icon">⏱️</span>
                    <div className="stat-content">
                      <span className="stat-value">{subscription.usageHours} hrs</span>
                      <span className="stat-label">per {subscription.usageFrequency || 'week'}</span>
                    </div>
                  </div>
                  <div className="usage-stat">
                    <span className="stat-icon">📊</span>
                    <div className="stat-content">
                      <span className="stat-value">{analytics.monthlyHours} hrs</span>
                      <span className="stat-label">monthly total</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="details-section">
              <h3>Subscription Details</h3>
              <div className="details-grid">
                {subscription.renewalDate && (
                  <div className="detail-item">
                    <span className="detail-label">Next Renewal</span>
                    <span className="detail-value">
                      {new Date(subscription.renewalDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      {analytics.daysUntilRenewal && (
                        <span className="days-badge">
                          {analytics.daysUntilRenewal > 0 
                            ? `in ${analytics.daysUntilRenewal} days`
                            : 'Renewal due!'}
                        </span>
                      )}
                    </span>
                  </div>
                )}
                
                {subscription.trialEndDate && (
                  <div className="detail-item">
                    <span className="detail-label">Trial Ends</span>
                    <span className="detail-value">
                      {new Date(subscription.trialEndDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                
                <div className="detail-item">
                  <span className="detail-label">Added On</span>
                  <span className="detail-value">
                    {subscription.dateAdded 
                      ? new Date(subscription.dateAdded).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Unknown'}
                    {analytics.subscriptionAge > 0 && (
                      <span className="days-badge">
                        {analytics.subscriptionAge} days ago
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {subscription.notes && (
              <div className="notes-section">
                <h3>Notes</h3>
                <p className="notes-content">{subscription.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Analytics & Related */}
        <div className="sidebar-section">
          {/* Quick Actions */}
          <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="actions-list">
              <button className="action-item" onClick={() => navigate('/budget')}>
                <span className="action-icon">📊</span>
                <span>View in Budget</span>
              </button>
              <button className="action-item" onClick={() => navigate('/usage')}>
                <span className="action-icon">⏱️</span>
                <span>Check Usage Insights</span>
              </button>
              <button 
                className="action-item cancel"
                onClick={() => window.open(`https://www.google.com/search?q=how+to+cancel+${encodeURIComponent(subscription.name)}+subscription`, '_blank')}
              >
                <span className="action-icon">🔍</span>
                <span>How to Cancel</span>
              </button>
            </div>
          </div>

          {/* Related Subscriptions */}
          {relatedSubscriptions.length > 0 && (
            <div className="related-subscriptions-card">
              <h3>Related Subscriptions</h3>
              <div className="related-list">
                {relatedSubscriptions.map(related => (
                  <Link 
                    key={related.id}
                    to={`/subscription/${related.id}`}
                    className="related-item"
                  >
                    <img
                      src={getSubscriptionLogo(related)}
                      alt={related.name}
                      className="related-logo"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(related.name)}&background=74b9ff&color=fff&size=32`;
                      }}
                    />
                    <div className="related-info">
                      <span className="related-name">{related.name}</span>
                      <span className="related-price">{related.price}/mo</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
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

export default SubscriptionDetail;