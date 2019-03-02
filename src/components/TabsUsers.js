import React, { Component, Fragment } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import TableUsers from "./TableUsers";

const tabs = [
  {
    id: 1,
    label: "All",
    printProperties: ["name", "email", "phone", "position"],
    extraGroup: null
  },
  {
    id: 2,
    label: "Developers",
    printProperties: ["name", "position", "skills"],
    extraGroup: "developer"
  },
  {
    id: 3,
    label: "Latest",
    printProperties: ["name", "date"],
    extraGroup: "latest"
  }
];

class TabsUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1
    };
  }

  toggleTabs = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
      this.props.deselectUser();
    }
  };

  render() {
    const { activeTab } = this.state;
    const { users, labels, selectedUserId, selectUser } = this.props;
    return (
      <Fragment>
        <Nav tabs>
          {tabs.map(({ id, label }) => (
            <NavItem key={id}>
              <NavLink
                className={classnames({ active: activeTab === id })}
                onClick={() => {
                  this.toggleTabs(id);
                }}
              >
                {label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
          {tabs.map(({ id, printProperties, extraGroup }) => (
            <TabPane key={id} tabId={id}>
              <TableUsers
                users={
                  extraGroup
                    ? users.filter(user => user.extraGroup.includes(extraGroup))
                    : users
                }
                labels={labels}
                printProperties={printProperties}
                selectedUserId={selectedUserId}
                selectUser={selectUser}
              />
            </TabPane>
          ))}
        </TabContent>
      </Fragment>
    );
  }
}

export default TabsUsers;
