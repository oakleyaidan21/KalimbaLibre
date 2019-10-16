import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SongSquare from "./components/home-components/SongSquare";
import Form from "react-bootstrap/Form";
import { Link } from "@reach/router";
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
      logBox = <LoginBox></LoginBox>;
    }
    return (
      <div>
        <Navbar bg="dark" variant="dark">
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
        {logBox}
      </div>
    );
  }
}

export default LandingPage;
