import React from 'react';
import { Link } from 'react-router-dom';

const RelatedSubscriptions = ({ relatedSubscriptions, getSubscriptionLogo }) => {
  return (
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
  );
};

export default RelatedSubscriptions;