import React, { Component } from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

class FormUser extends Component {
  render() {
    const {
      toggleFormUser,
      handleInputChange,
      extraGroups,
      formInputs,
      toggleExtraGroup,
      showedExtraGroup,
      handleFormSubmit
    } = this.props;
    const {
      inputName,
      inputPosition,
      inputEmail,
      inputPhone,
      inputSkills,
      inputDate,
      inputExtraGroup
    } = formInputs;

    return (
      <div className="mb-4">
        <Form onSubmit={handleFormSubmit}>
          <FormGroup row>
            <Label for="inputName" sm={2}>
              Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="inputName"
                id="inputName"
                value={inputName}
                onChange={handleInputChange}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="inputPosition" sm={2}>
              Position
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="inputPosition"
                id="inputPosition"
                value={inputPosition}
                onChange={handleInputChange}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="inputEmail" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="inputEmail"
                id="inputEmail"
                value={inputEmail}
                onChange={handleInputChange}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="inputPhone" sm={2}>
              Phone
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="inputPhone"
                id="inputPhone"
                value={inputPhone}
                onChange={handleInputChange}
              />
              <FormText color="muted">Optional</FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="inputDate" sm={2}>
              Date
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="inputDate"
                id="inputDate"
                value={inputDate}
                onChange={handleInputChange}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="inputSkills" sm={2}>
              Skills
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="inputSkills"
                id="inputSkills"
                value={inputSkills}
                onChange={handleInputChange}
              />
              <FormText color="muted">Optional</FormText>
            </Col>
          </FormGroup>
          <FormGroup>
            <FormGroup check>
              <Label>
                <Input
                  type="checkbox"
                  name="showedExtraGroup"
                  id="showedExtraGroup"
                  value={showedExtraGroup}
                  onChange={toggleExtraGroup}
                />{" "}
                User belongs to an extra group?
              </Label>
            </FormGroup>
          </FormGroup>
          {showedExtraGroup && (
            <FormGroup row>
              <Label for="inputExtraGroup" sm={2}>
                Extra group
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="inputExtraGroup"
                  id="inputExtraGroup"
                  value={inputExtraGroup}
                  onChange={handleInputChange}
                  multiple
                >
                  {extraGroups.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </Input>
                <FormText color="muted">Multiple</FormText>
              </Col>
            </FormGroup>
          )}
          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }} className="text-right">
              <Button color="success">Add</Button>{" "}
              <Button color="secondary" onClick={toggleFormUser}>
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default FormUser;
