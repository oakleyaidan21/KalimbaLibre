import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "@reach/router";

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

  logIn = () => {
    console.log(this.state.username + " " + this.state.password);
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
          padding: 15
        }}
      >
        <Form>
          <Form.Group controlId="formBasic">
            <Form.Label>Username</Form.Label>
            <Form.Control size="sm" onChange={this.setUsername} />
          </Form.Group>
          <Form.Group controlId="formBasic">
            <Form.Label>Password</Form.Label>
            <Form.Control size="sm" onChange={this.setPassword} />
          </Form.Group>

          <Link to={"/homepage/" + this.state.username} target="_blank">
            <Button variant="primary" type="submit" size="sm" id="confBtn">
              Login
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default LoginBox;
