import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class selectedUser extends Component {
  render() {
    const { toggleModal, modal, selectedUser, handleDelete } = this.props;
    return (
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        className={this.props.className}
      >
        <ModalHeader toggle={toggleModal}>Delete user</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the user {selectedUser.name}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default selectedUser;
