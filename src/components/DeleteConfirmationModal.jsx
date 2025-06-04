import React from 'react';
import '../styles/App.css'; 
import '../styles/Subscriptions/Subscriptions.css'; 
import '../styles/Modals/Modal.css';
import '../styles/Modals/DeleteModal.css';
import '../styles/Modals/ModalHeader.css';
import '../styles/Modals/ModalFooter.css';

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay delete-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Delete Subscription</h2>
          <button className="close-button" onClick={onCancel}>✕</button>
        </div>
        {
        /* Warning icon and confirmation UI - designed for accessibility
        // with clear visual hierarchy and action confirmation
        // This is how I am communicating throughout the entire app , visual as well as textually*/
        }
        <div className="modal-body">
          <div className="warning-icon">⚠️</div>
          <h3>Are you sure?</h3>
          <p>This action cannot be undone. This subscription will be permanently deleted from your account.</p>
        </div>
        <div className="modal-footer">
          <button onClick={onCancel}>Cancel</button>
          <button className="delete-button" onClick={onConfirm}>Delete Subscription</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;