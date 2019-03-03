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
  };

  toggleFormUser = () => {
    this.setState(prevState => ({
      showedFormUser: !prevState.showedFormUser
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
    this.addUser();
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
      users: [...this.state.users, editedUser]
    });
    this.toggleFormUser();
  };

  toggleExtraGroup = () => {
    this.setState(prevState => ({
      showedExtraGroup: !prevState.showedExtraGroup
    }));
  };

  render() {
    const {
      users,
      selectedUserId,
      selectedUser,
      showedFormUser,
      showedExtraGroup,
      formInputs
    } = this.state;

    return (
      <Container className="py-4">
        <ActionButtons
          selectedUserId={selectedUserId}
          selectedUser={selectedUser}
          deleteUser={this.deleteUser}
          toggleFormUser={this.toggleFormUser}
        />
        {showedFormUser && (
          <FormUser
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            extraGroups={extraGroups}
            toggleExtraGroup={this.toggleExtraGroup}
            showedExtraGroup={showedExtraGroup}
            toggleFormUser={this.toggleFormUser}
            formInputs={formInputs}
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
