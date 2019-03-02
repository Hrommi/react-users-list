import React from "react";
import { Table } from "reactstrap";
import "./TableUsers.css";

const TableUsers = ({
  users,
  printProperties,
  labels,
  selectedUserId,
  selectUser
}) => {
  const handleClick = id => {
    selectUser(id);
  };

  return (
    <Table>
      <thead>
        <tr>
          {printProperties.map((attr, index) => (
            <th key={index}>{labels[attr]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr
              key={user.id}
              data-id={user.id}
              onClick={() => handleClick(user.id)}
              className={user.id === selectedUserId ? "selected-row" : ""}
            >
              {printProperties.map((attr, index) => (
                <td key={index}>{user[attr]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableUsers;
