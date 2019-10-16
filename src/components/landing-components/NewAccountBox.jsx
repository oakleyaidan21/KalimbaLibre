import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class NewAccountBox extends Component {
  state = {
    username: "none",
    password: "none",
    matchPassword: "none",
    incorrectUsername: false,
    incorrectPassword: false
  };

  setUsername = event => {
    this.setState({ username: event.target.value });
  };

  setPassword = event => {
    this.setState({ password: event.target.value });
  };

  setMatchPassword = event => {
    this.setState({ matchPassword: event.target.value });
  };

  unRender = () => {
    this.props.onUnRender();
  };

  createNewAccount = () => {
    //search to see if username is taken
    //see if passwords are valid and match
    if (this.state.password !== this.state.matchPassword) {
      this.setState({ incorrectPassword: true });
      return;
    }
    // if both are successful, make new account in database and take them to their home page

    console.log("success!");
  };

  render() {
    let incorrectUsername = <></>;
    let incorrectPassword = <></>;
    if (this.state.incorrectUsername) {
      incorrectUsername = (
        <div style={{ color: "red" }}>Invalid or non-existing username</div>
      );
    }
    if (this.state.incorrectPassword) {
      incorrectPassword = (
        <div style={{ color: "red" }}>Passwords do not match</div>
      );
    }
    return (
      <div
        style={{
          width: 300,
          height: 370,
          backgroundColor: "lightgrey",
          margin: "0 auto",
          marginTop: 100,
          borderRadius: 10,
          padding: 15,
          opacity: 1.0,
          zIndex: "10"
        }}
      >
        <Form>
          <Form.Group controlId="formUser">
            <Form.Label>Username</Form.Label>
            <Form.Control
              size="sm"
              placeholder={"Enter a Username"}
              onChange={this.setUsername}
            />
            <Form.Text>{incorrectUsername}</Form.Text>
          </Form.Group>
          <Form.Group controlId="formPass">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="sm"
              placeholder={"Enter a Password"}
              onChange={this.setPassword}
              type="password"
            />
          </Form.Group>
          <Form.Group controlId="formPass">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              size="sm"
              placeholder={"Confirm Password"}
              onChange={this.setMatchPassword}
              type="password"
            />
            <Form.Text>{incorrectPassword}</Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            size="sm"
            id="loginBtn"
            onClick={() => {
              this.createNewAccount();
            }}
          >
            Create
          </Button>
          <br></br>
          <br></br>
          <Button
            variant="outline-primary"
            size="sm"
            id="confBtn"
            onClick={() => {
              this.unRender();
            }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    );
  }
}

export default NewAccountBox;
