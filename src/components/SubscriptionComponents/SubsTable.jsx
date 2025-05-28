import React from 'react';
import SubscriptionRow from './SubscriptionRow';
import { getCategoryColor, getTagColor } from '../../utils/subscriptionUtils';

const SubscriptionTable = ({ 
  subscriptions, 
  onEdit, 
  onDelete 
}) => (
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
                onEdit={onEdit}
                onDelete={onDelete}
                getCategoryColor={getCategoryColor}
                getTagColor={getTagColor}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default SubscriptionTable;