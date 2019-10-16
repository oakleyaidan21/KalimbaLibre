import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { navigate, Link } from "@reach/router";

class LoginBox extends Component {
  state = {
    username: "none",
    password: "none",
    incorrectUsername: false,
    incorrectPassword: false
  };

  setUsername = event => {
    this.setState({ username: event.target.value });
  };

  setPassword = event => {
    this.setState({ password: event.target.value });
  };

  unRender = () => {
    this.props.onUnRender();
  };

  logIn = () => {
    //search for username
    var cancel = false;
    console.log("username: + '" + this.state.username + "'");
    if (this.state.username === "none") {
      this.setState({ incorrectUsername: true });
      cancel = true;
    }
    //see if password is correct or not
    if (this.state.password === "none") {
      this.setState({ incorrectPassword: true });
      cancel = true;
    }
    if (!cancel) {
      navigate("/homepage/" + this.state.username);
    }
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
        <div style={{ color: "red" }}>Invalid or non-existing password</div>
      );
    }
    return (
      <div
        style={{
          width: 300,
          height: 330,
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
              placeholder={"Enter your Username"}
              onChange={this.setUsername}
            />
            <Form.Text>{incorrectUsername}</Form.Text>
          </Form.Group>
          <Form.Group controlId="formPass">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="sm"
              placeholder={"Enter your Password"}
              onChange={this.setPassword}
              type="password"
            />
            <Form.Text>{incorrectPassword}</Form.Text>
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
        <div style={{ marginTop: 10 }}>
          Dont have an account? <Link to="/homepage">Create one!</Link>
        </div>
      </div>
    );
  }
}

export default LoginBox;
