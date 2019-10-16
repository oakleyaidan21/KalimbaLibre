import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { navigate } from "@reach/router";
import crypto from "crypto";

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

  genRandomString = len => {
    return crypto
      .randomBytes(Math.ceil(len / 2))
      .toString("hex")
      .slice(0, len);
  };

  //password database logic:
  // create new password
  //   generate SALT
  //   hash SALT with USERPASSWORD to make the HASHP
  //   store the HASHP along with the SALT in the database
  // validate login
  //   validate that USER exists
  //   retrieve USER's HASHP and SALT
  //   hash the NEWLYENTEREDPASSWORD and SALT to make HASHC
  //   compare HASHC and HASHP
  //   if they are correct, then let them in

  sha512 = (password, salt) => {
    var hash = crypto.createHmac(
      "sha512",
      salt
    ); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest("hex");
    return {
      salt: salt,
      passwordHash: value
    };
  };

  saltHashPassword(userpassword) {
    var salt = this.genRandomString(16);
    var passwordData = this.sha512(userpassword, salt);
    console.log("UserPassword = " + userpassword);
    console.log("Passwordhash = " + passwordData.passwordHash);
    console.log("nSalt =" + passwordData.salt);
    return passwordData.passwordHash;
  }

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
    var salt = this.genRandomString(16);
    var passwordData = this.sha512(this.state.password, salt);
    var passwordData2 = this.sha512(this.state.password, salt);
    if (passwordData.passwordHash === passwordData2.passwordHash) {
      console.log("match");
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
          height: 380,
          backgroundColor: "white",
          margin: "0 auto",
          marginTop: 100,
          borderRadius: 10,
          padding: 15,
          opacity: 1.0,
          zIndex: "10"
        }}
      >
        <div style={{ fontSize: 20, fontWeight: "bold", margin: "0 auto" }}>
          Log-in
        </div>
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
          Dont have an account?{" "}
          <button
            onClick={() => {
              this.props.onShowNewAccount();
            }}
            style={{
              border: "none",
              background: "rgb(0,0,0,0)",
              color: "rgb(0,123,255)"
            }}
          >
            Create one!
          </button>
        </div>
      </div>
    );
  }
}

export default LoginBox;