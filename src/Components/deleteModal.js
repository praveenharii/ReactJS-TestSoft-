import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteUserModal({ deleteUser, user }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [reason, setReason] = useState("");

  const toggleCloseDeleteModal = () => {
    setDeleteModal(false);
    setReason("");
  };

  const handleDeleteResult = () => {
    deleteUser(user.id, user.email, reason);
    toggleCloseDeleteModal();
  };

  return (
    <>
      <Button variant="danger" onClick={() => setDeleteModal(true)}>
        Reject User
      </Button>

      <Modal show={deleteModal} onHide={toggleCloseDeleteModal}>
        <Modal.Header className="bg-danger text-white" closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
          <label htmlFor="reasonInput" className="form-label">
            Reason for deletion (optional):
          </label>
          <input
            type="text"
            id="reasonInput"
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteResult}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
