import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import crypto from "crypto";
import { delay } from "q";
import { navigate } from "@reach/router";

class NewAccountBox extends Component {
  state = {
    username: "none",
    password: "none",
    matchPassword: "none",
    incorrectUsername: false,
    incorrectPassword: false,
    incorrectMatchPassword: false
  };

  setUsername = event => {
    this.setState({ username: event.target.value, incorrectUsername: false });
  };

  setPassword = event => {
    this.setState({ password: event.target.value, incorrectPassword: false });
  };

  setMatchPassword = event => {
    this.setState({
      matchPassword: event.target.value,
      incorrectMatchPassword: false
    });
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

  createNewAccount = async () => {
    //search to see if username is taken or invalid
    var taken = false;
    fetch(process.env.REACT_APP_DB_LOCATION + "/users")
      .then(
        data => {
          return data.json();
        },
        err => console.log(err)
      )
      .then(
        parsedData => {
          for (var i = 0; i < parsedData.length; i++) {
            if (parsedData[i].username === this.state.username) {
              this.setState({ incorrectUsername: true });
              taken = true;
              return;
            }
          }
        },
        err => console.log(err)
      );
    await delay(500);
    if (taken) {
      this.setState({ incorrectUsername: true });
      return;
    }
    if (/\W/.test(this.state.username)) {
      this.setState({ incorrectUsername: true });
      return;
    }

    //see if passwords are valid and match
    if (this.state.password.length < 8 || !/\d/.test(this.state.password)) {
      this.setState({ incorrectPassword: true });
      return;
    }
    if (this.state.password !== this.state.matchPassword) {
      this.setState({ incorrectMatchPassword: true });
      return;
    }

    // if all statements are successful, make new account in database and take them to their home page
    var toBesalt = this.genRandomString(16);
    var toBehashp = this.sha512(this.state.password, toBesalt).passwordHash;

    //upload to database
    fetch("https://warm-inlet-29455.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        hashp: toBehashp,
        salt: toBesalt
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(resJSON => {
        console.log(resJSON);
      })
      .catch(error => console.error({ Error: error }));

    //navigate them to their homepage
    navigate("/homepage/", { state: { userID: this.state.username } });
  };

  render() {
    let incorrectUsername = (
      <div>At least 5 characters long with only alphanumeric characters</div>
    );
    let incorrectMatchPassword = <></>;
    let incorrectPassword = (
      <div>At least 8 characters long with at least 1 number</div>
    );
    if (this.state.incorrectUsername) {
      incorrectUsername = (
        <div style={{ color: "red" }}>Invalid or already taken username</div>
      );
    }
    if (this.state.incorrectMatchPassword) {
      incorrectMatchPassword = (
        <div style={{ color: "red" }}>Passwords do not match</div>
      );
    }
    if (this.state.incorrectPassword) {
      incorrectPassword = (
        <div style={{ color: "red" }}>Password does not follow criteria</div>
      );
    }
    return (
      <div
        style={{
          width: 350,
          height: 470,
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
          New Account
        </div>
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
            <Form.Text>{incorrectPassword}</Form.Text>
          </Form.Group>
          <Form.Group controlId="formPassMatch">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              size="sm"
              placeholder={"Confirm Password"}
              onChange={this.setMatchPassword}
              type="password"
            />
            <Form.Text>{incorrectMatchPassword}</Form.Text>
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
