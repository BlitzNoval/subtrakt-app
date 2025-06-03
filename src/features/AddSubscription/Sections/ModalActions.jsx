import React from 'react';

const ModalActions = ({ closeModal, loading, isEditing }) => {
  return (
    <div className="modal-footer">
      <button type="button" onClick={closeModal} disabled={loading}>
        Cancel
      </button>
      <button type="submit" disabled={loading} className="primary-button">
        {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add')} Subscription
      </button>
    </div>
  );
};

export default ModalActions;