import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoginBox from "./components/landing-components/LoginBox";

class LandingPage extends Component {
  state = {
    showLogin: false
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
          ></LoginBox>
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
            <Nav.Link>Song Database</Nav.Link>
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
      </div>
    );
  }
}

export default LandingPage;
