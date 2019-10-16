import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { navigate } from "@reach/router";

class LoginBox extends Component {
  state = {
    username: "none",
    password: "none"
  };

  setUsername = event => {
    console.log(event.target.value);
    this.setState({ username: event.target.value });
  };

  setPassword = event => {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  };

  unRender = () => {
    this.props.onUnRender();
  };

  logIn = () => {
    //search for username
    console.log("username: + " + this.state.username);
    if (this.state.username !== "none" || this.state.username != null) {
      navigate("/homepage/" + this.state.username);
    } else {
      console.log("peepepepep");
      window.alert("invalid");
    }
  };

  render() {
    return (
      <div
        style={{
          width: 300,
          height: 300,
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
          <Form.Group controlId="formBasic">
            <Form.Label>Username</Form.Label>
            <Form.Control
              size="sm"
              placeholder={"Enter your Username"}
              onChange={this.setUsername}
            />
          </Form.Group>
          <Form.Group controlId="formBasic">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="sm"
              placeholder={"Enter your Password"}
              onChange={this.setPassword}
              type="password"
            />
          </Form.Group>

          <Button
            variant="primary"
            size="sm"
            id="loginBtn"
            onClick={() => {
              this.logIn();
            }}
          >
            Login
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

export default LoginBox;
