import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionRow = ({ sub, getSubscriptionLogo, openMenuId, setOpenMenuId, onEdit, onDelete, navigate, actionMenuRef }) => {
  const getServiceInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Entertainment': '#1f77b4', 'Software': '#ff6b6b', 'Gaming': '#9b59b6',
      'Cloud Storage': '#0077b5', 'Other': '#95a5a6'
    };
    return colors[category] || '#3498db';
  };

  const getTagColor = (category) => {
    const colors = {
      'Entertainment': '#e17055', 'Software': '#f39c12', 'Gaming': '#fd79a8',
      'Cloud Storage': '#a29bfe', 'Other': '#b2bec3'
    };
    return colors[category] || '#74b9ff';
  };

  return (
    <tr>
      <td>
        <Link to={`/subscription/${sub.id}`} className="service-link">
          <div className="service-info">
            <div className="service-logo" style={{ background: 'transparent', padding: '0' }}>
              <img
                src={getSubscriptionLogo(sub)}
                alt={sub.name}
                style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{
                display: 'none', width: '40px', height: '40px', borderRadius: '8px',
                background: getCategoryColor(sub.category), alignItems: 'center',
                justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '16px'
              }}>
                {getServiceInitials(sub.name)}
              </div>
            </div>
            <div className="service-details">
              <strong>{sub.name}</strong>
              <small>{sub.billingCycle || 'Monthly'}</small>
            </div>
          </div>
        </Link>
      </td>
      <td><span className="price">{sub.price}</span></td>
      <td>
        <span className="category-badge" style={{ 
          backgroundColor: getTagColor(sub.category), color: 'white'
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
        <span className={`importance-badge importance-${sub.importance?.toLowerCase()}`}>
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
        <button className="actions-btn" onClick={() => setOpenMenuId(openMenuId === sub.id ? null : sub.id)}>
          ⋮
        </button>
        {openMenuId === sub.id && (
          <div className="action-menu" ref={openMenuId === sub.id ? actionMenuRef : null}>
            <button onClick={() => {
              navigate(`/subscription/${sub.id}`);
              setOpenMenuId(null);
            }}>📃 View Details</button>
            <button onClick={() => {
              onEdit(sub);
              setOpenMenuId(null);
            }}>🖋️ Edit</button>
            <button onClick={() => {
              onDelete(sub.id);
              setOpenMenuId(null);
            }}>✅ Delete</button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default SubscriptionRow;