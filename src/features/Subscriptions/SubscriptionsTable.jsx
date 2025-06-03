import React, { useState, useRef, useEffect } from 'react';
import SubscriptionRow from './Visuals/SubscriptionRow';
import '../../styles/Subscriptions/SubsTable.css';
import '../../styles/Subscriptions/SubsService.css';
import '../../styles/Subscriptions/SubsActions.css';

const SubscriptionsTable = ({ subscriptions, getSubscriptionLogo, onEdit, onDelete, navigate }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
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
              {subscriptions.map((sub) => (
                <SubscriptionRow
                  key={sub.id}
                  sub={sub}
                  getSubscriptionLogo={getSubscriptionLogo}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  navigate={navigate}
                  actionMenuRef={actionMenuRef}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsTable;