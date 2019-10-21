import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoginBox from "./components/landing-components/LoginBox";
import NewAccountBox from "./components/landing-components/NewAccountBox";
import { navigate } from "@reach/router";

class LandingPage extends Component {
  state = {
    showLogin: false,
    showNewAccount: false
  };

  login = () => {
    console.log("pressed");
    this.setState({ showLogin: true });
  };

  render() {
    let logBox = <div></div>;

    if (this.state.showLogin) {
      logBox = (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(128,128,128,0.5)",
            zIndex: 7
          }}
        >
          <LoginBox
            onUnRender={() => {
              this.setState({ showLogin: false });
            }}
            onShowNewAccount={() => {
              this.setState({ showNewAccount: true });
            }}
          ></LoginBox>
        </div>
      );
    }
    if (this.state.showNewAccount) {
      logBox = (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(128,128,128,0.5)",
            zIndex: 7
          }}
        >
          <NewAccountBox
            onUnRender={() => {
              this.setState({ showNewAccount: false, showLogin: false });
            }}
          ></NewAccountBox>
        </div>
      );
    }
    return (
      <div>
        {logBox}

        <Navbar
          bg="dark"
          variant="dark"
          style={{ position: "relative", zIndex: 5 }}
        >
          <Navbar.Brand href="localhost:3000">Kalimba Libre</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link
              onClick={() => {
                navigate("/database/", { state: { userID: 0 } });
              }}
            >
              Song Database
            </Nav.Link>
            <Nav.Link>About</Nav.Link>
            <Nav.Link
              href="https://github.com/oakleyaidan21/KalimbaLibre"
              target="_blank"
            >
              Github
            </Nav.Link>
          </Nav>
          <Form inline>
            <Button
              variant="outline-primary"
              onClick={() => {
                this.login();
              }}
            >
              Login
            </Button>
          </Form>
        </Navbar>
        {/** filler stuff */}
        <div
          style={{
            margin: "O auto",
            width: "100%",
            height: "100%",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "50px" }}>Welcome to Kalimba Libre!</div>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 10,
              background: "lightgrey",
              margin: "0 auto",
              textAlign: "center",
              paddingTop: 90,
              marginTop: 10
            }}
          >
            This is a box!
          </div>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 10,
              background: "lightgrey",
              margin: "0 auto",
              textAlign: "center",
              paddingTop: 90,
              marginTop: 50
            }}
          >
            This is <b>another</b> box!
          </div>
          <div
            style={{
              width: 400,
              height: 200,
              borderRadius: 10,
              background: "lightgrey",
              margin: "0 auto",
              textAlign: "center",
              paddingTop: 90,
              marginTop: 50
            }}
          >
            How about a <i>rectangle</i>? Psst, scroll down
          </div>
          <div
            style={{
              width: 450,
              height: 300,
              borderRadius: 10,
              background: "lightgrey",
              margin: "0 auto",
              textAlign: "center",
              paddingTop: 140,
              marginTop: 50
            }}
          >
            How about <i>yet another quadrilateral</i>? This is certainly not
            filler!
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
