import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import ModalDeleteUser from "./ModalDeleteUser";

class ActionButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleDelete = () => {
    this.toggleModal();
    this.props.deleteUser();
  };

  render() {
    const { selectedUserId, selectedUser } = this.props;
    const { modal } = this.state;
    return (
      <Fragment>
        <div className="mb-4">
          <Button
            color="primary"
            disabled={!selectedUserId}
            onClick={this.toggleModal}
          >
            Удалить
          </Button>
        </div>
        <ModalDeleteUser
          toggleModal={this.toggleModal}
          modal={modal}
          selectedUser={selectedUser}
          handleDelete={this.handleDelete}
        />
      </Fragment>
    );
  }
}

export default ActionButtons;
