import React, { Component } from "react";
import { Container } from "reactstrap";

import { users } from "./usersData";
import ActionButtons from "./components/ActionButtons";
import TabsUsers from "./components/TabsUsers";
import FormUser from "./components/FormUser";

const labels = {
  id: "Id",
  name: "Name",
  position: "Position",
  email: "Email",
  phone: "Phone",
  skills: "Skills",
  date: "Date"
};

const extraGroups = ["developer", "latest"];

class App extends Component {
  state = {
    users: users,
    selectedUserId: null,
    selectedUser: {},
    showedFormUser: false,
    formInputs: {
      inputName: "",
      inputPosition: "",
      inputEmail: "",
      inputPhone: "",
      inputSkills: "",
      inputDate: "",
      inputExtraGroup: []
    },
    formAction: {
      action: "",
      buttonLabel: ""
    },
    showedExtraGroup: false
  };

  selectUser = id => {
    this.setState({
      selectedUserId: id,
      selectedUser: this.state.users.filter(user => user.id === id)[0]
    });
  };

  deselectUser = () => {
    this.setState({
      selectedUserId: null,
      selectedUser: {}
    });
  };

  deleteUser = () => {
    this.setState({
      users: this.state.users.filter(
        user => user.id !== this.state.selectedUserId
      )
    });
    this.deselectUser();
    this.hideFormUser();
  };

  addUser = () => {
    const { formInputs, showedExtraGroup } = this.state;
    const {
      inputName,
      inputPosition,
      inputEmail,
      inputPhone,
      inputSkills,
      inputDate,
      inputExtraGroup
    } = formInputs;
    const editedUser = {
      id: Date.now().toString(),
      extraGroup: showedExtraGroup ? inputExtraGroup : [],
      name: inputName,
      position: inputPosition,
      email: inputEmail,
      phone: inputPhone,
      skills: inputSkills,
      date: inputDate
    };
    this.setState(prevState => ({
      formInputs: {
        inputName: "",
        inputPosition: "",
        inputEmail: "",
        inputPhone: "",
        inputSkills: "",
        inputDate: "",
        inputExtraGroup: []
      },
      showedExtraGroup: false,
      users: [...prevState.users, editedUser]
    }));
    this.deselectUser();
    this.hideFormUser();
  };

  editUser = () => {
    const { formInputs, showedExtraGroup, selectedUserId } = this.state;
    const {
      inputName,
      inputPosition,
      inputEmail,
      inputPhone,
      inputSkills,
      inputDate,
      inputExtraGroup
    } = formInputs;
    const editedUser = {
      id: selectedUserId,
      extraGroup: showedExtraGroup ? inputExtraGroup : [],
      name: inputName,
      position: inputPosition,
      email: inputEmail,
      phone: inputPhone,
      skills: inputSkills,
      date: inputDate
    };
    this.setState(prevState => ({
      formInputs: {
        inputName: "",
        inputPosition: "",
        inputEmail: "",
        inputPhone: "",
        inputSkills: "",
        inputDate: "",
        inputExtraGroup: []
      },
      showedExtraGroup: false,
      users: prevState.users.map(user =>
        user.id === selectedUserId ? editedUser : user
      )
    }));
    this.hideFormUser();
  };

  showAddForm = () => {
    this.showFormUser();
    this.setState({
      formInputs: {
        inputName: "",
        inputPosition: "",
        inputEmail: "",
        inputPhone: "",
        inputSkills: "",
        inputDate: "",
        inputExtraGroup: []
      },
      showedExtraGroup: false,
      formAction: {
        action: "add",
        buttonLabel: "Add"
      }
    });
  };

  showEditForm = () => {
    const { selectedUser } = this.state;
    const {
      name,
      position,
      email,
      phone,
      skills,
      date,
      extraGroup
    } = selectedUser;
    this.showFormUser();
    this.setState({
      formInputs: {
        inputName: name,
        inputPosition: position,
        inputEmail: email,
        inputPhone: phone,
        inputSkills: skills,
        inputDate: date,
        inputExtraGroup: extraGroup
      },
      showedExtraGroup: extraGroup.length > 0 ? true : false,
      formAction: {
        action: "edit",
        buttonLabel: "Edit"
      }
    });
  };

  showFormUser = () => {
    this.setState({
      showedFormUser: true
    });
  };

  hideFormUser = () => {
    this.setState({
      showedFormUser: false
    });
  };

  toggleExtraGroup = () => {
    this.setState(prevState => ({
      showedExtraGroup: !prevState.showedExtraGroup
    }));
  };

  handleInputChange = e => {
    const { target } = e;
    const value =
      target.tagName === "SELECT"
        ? [].filter.call(target.options, o => o.selected).map(o => o.value)
        : target.type === "checkbox"
        ? target.checked
        : target.value;
    const { name } = target;
    this.setState(prevState => ({
      formInputs: {
        ...prevState.formInputs,
        [name]: value
      }
    }));
  };

  handleFormSubmit = e => {
    e.preventDefault();
    switch (this.state.formAction.action) {
      case "add":
        this.addUser();
        break;
      case "edit":
        this.editUser();
        break;
      default:
    }
  };

  render() {
    const {
      users,
      selectedUserId,
      selectedUser,
      showedFormUser,
      showedExtraGroup,
      formInputs,
      formAction
    } = this.state;

    return (
      <Container className="py-4">
        <ActionButtons
          selectedUserId={selectedUserId}
          selectedUser={selectedUser}
          deleteUser={this.deleteUser}
          showAddForm={this.showAddForm}
          showEditForm={this.showEditForm}
        />
        {showedFormUser && (
          <FormUser
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            extraGroups={extraGroups}
            toggleExtraGroup={this.toggleExtraGroup}
            showedExtraGroup={showedExtraGroup}
            hideFormUser={this.hideFormUser}
            formInputs={formInputs}
            buttonLabel={formAction.buttonLabel}
          />
        )}

        <TabsUsers
          users={users}
          labels={labels}
          selectedUserId={selectedUserId}
          selectUser={this.selectUser}
          deselectUser={this.deselectUser}
        />
      </Container>
    );
  }
}

export default App;
