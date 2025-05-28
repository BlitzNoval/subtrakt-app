import React, { useState, useRef, useEffect } from 'react';

const SubscriptionRow = ({ 
  sub, 
  onEdit, 
  onDelete,
  getCategoryColor,
  getTagColor
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Handle click outside menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getServiceInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <tr key={sub.id}>
      <td>
        <div className="service-info">
          <div className="service-logo" style={{ background: getCategoryColor(sub.category) }}>
            {getServiceInitials(sub.name)}
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
        }}>
          {sub.category}
        </span>
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
        <button 
          className="actions-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ⋮
        </button>
        {isMenuOpen && (
          <div className="action-menu" ref={menuRef}>
            <button onClick={() => onEdit(sub)}>
              ✏️ Edit
            </button>
            <button onClick={() => onDelete(sub.id)}>
              🗑️ Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default SubscriptionRow;