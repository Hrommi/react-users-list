import React, { Component } from "react";
import { Container } from "reactstrap";

import { users } from "./usersData";
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
    selectUserId: null
  };

  selectUser = id => {
    this.setState({
      selectUserId: id
    });
  };

  deselectUser = () => {
    this.setState({
      selectUserId: null
    });
  };

  render() {
    const { users, selectUserId } = this.state;

    return (
      <Container className="py-4">
        {selectUserId &&
          users
            .filter(user => user.id === selectUserId)
            .map((user, index) => <p key="user.id">{user.name}</p>)}

        <TabsUsers
          users={users}
          labels={labels}
          selectUserId={selectUserId}
          selectUser={this.selectUser}
          deselectUser={this.deselectUser}
        />
      </Container>
    );
  }
}

export default App;
