import React, { Component } from "react";
import { Container } from "reactstrap";

import { users } from "./usersData";
import ActionButtons from "./components/ActionButtons";
import TabsUsers from "./components/TabsUsers";

const labels = {
  id: "Id",
  name: "Name",
  position: "Position",
  email: "Email",
  phone: "Phone",
  skills: "Skills",
  date: "Date"
};

class App extends Component {
  state = {
    users: users,
    selectedUserId: null,
    selectedUser: {}
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

  render() {
    const { users, selectedUserId, selectedUser } = this.state;

    return (
      <Container className="py-4">
        <ActionButtons
          selectedUserId={selectedUserId}
          selectedUser={selectedUser}
          deleteUser={this.deleteUser}
        />

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
