import React, { Component } from "react";
import { Container } from "reactstrap";

import { users } from "./usersData";
import TableUsers from "./components/TableUsers";

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
    selectUserId: null
  };

  selectUser = id => {
    this.setState({
      selectUserId: id
    });
  };

  render() {
    const { selectUserId } = this.state;

    return (
      <Container className="py-4">
        {selectUserId &&
          users
            .filter(user => user.id === selectUserId)
            .map((user, index) => <p key="user.id">{user.name}</p>)}
        <TableUsers
          users={users}
          labels={labels}
          printProperties={["name", "email", "position"]}
          selectUserId={selectUserId}
          selectUser={this.selectUser}
        />
      </Container>
    );
  }
}

export default App;
