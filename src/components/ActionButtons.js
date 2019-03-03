import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";

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
    const {
      selectedUserId,
      selectedUser,
      showAddForm,
      showEditForm
    } = this.props;
    const { modal } = this.state;
    return (
      <Fragment>
        <div className="mb-4">
          <Button color="primary" onClick={showAddForm}>
            Add user
          </Button>{" "}
          <Button
            color="primary"
            disabled={!selectedUserId}
            onClick={showEditForm}
          >
            Edit user
          </Button>{" "}
          <Button
            color="danger"
            disabled={!selectedUserId}
            onClick={this.toggleModal}
          >
            Delete user
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
