import React from 'react';
import { subscriptionService } from '../../../utils/SubscriptionService';

const ServiceSearchDropdown = ({ searchResults, dropdownRef, handleServiceSelect }) => {
  return (
    <div 
      ref={dropdownRef}
      className="search-dropdown"
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        maxHeight: '200px',
        overflowY: 'auto',
        marginTop: '4px'
      }}
    >
      {searchResults.map((service, index) => (
        <div
          key={service.id}
          className="search-dropdown-item"
          onClick={() => handleServiceSelect(service)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            cursor: 'pointer',
            borderBottom: index < searchResults.length - 1 ? '1px solid #f3f4f6' : 'none',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
        >
          <img
            src={subscriptionService.getLogoUrl(service)}
            alt={service.name}
            className="search-dropdown-logo"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              marginRight: '12px',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(service.name)}&background=74b9ff&color=fff&size=32`;
            }}
          />
          <div className="search-dropdown-details" style={{ flex: 1 }}>
            <div className="search-dropdown-name" style={{ fontWeight: '600', fontSize: '14px', color: '#2c3e50' }}>
              {service.fullName}
            </div>
            <div className="search-dropdown-meta" style={{ fontSize: '12px', color: '#6b7280' }}>
              {subscriptionService.formatPrice(service)} • {service.category}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSearchDropdown;