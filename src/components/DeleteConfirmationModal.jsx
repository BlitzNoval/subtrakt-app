import React from 'react';
import '../styles/App.css'; 
import '../styles/Subscriptions.css'; 

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure you want to delete this subscription?</h2>
        <div className="modal-footer">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;