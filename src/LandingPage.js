import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoginBox from "./components/landing-components/LoginBox";
import NewAccountBox from "./components/landing-components/NewAccountBox";
import { navigate } from "@reach/router";
import dbLocation from "./localVariables";
import SongSquare from "./components/home-components/SongSquare";

class LandingPage extends Component {
  state = {
    showLogin: false,
    showNewAccount: false,
    newSquares: []
  };

  login = () => {
    console.log("pressed");
    this.setState({ showLogin: true });
  };

  handleNewSongs = data => {
    var temp = [];
    var length = 5;
    if (length > data.length) {
      length = data.length;
    }
    for (var i = 0; i < length; i++) {
      if (data[i].private !== 1) {
        temp.push({
          title: data[i].title,
          keySig: data[i].keysig,
          tempo: data[i].tempo,
          length: data[i].length,
          id: data[i].id,
          songString: data[i].songString,
          private: data[i].private
        });
      }
    }
    this.setState({ newSquares: temp });
  };

  parseText = data => {
    this.handleNewSongs(data);
    //will also handle featured songs
    //should be ordered by popularity -- how that will happen, I don't know
  };

  componentDidMount = () => {
    fetch(dbLocation + "/ksongs")
      .then(
        data => {
          return data.json();
        },
        err => console.log(err)
      )
      .then(parsedData => this.parseText(parsedData), err => console.log(err));
  };

  render() {
    let logBox = <div></div>;
    let newSquares = this.state.newSquares.map(songSquare => (
      <SongSquare
        title={songSquare.title}
        keySig={songSquare.keySig}
        tempo={songSquare.tempo}
        length={songSquare.length}
        id={songSquare.id}
        user={songSquare.username}
        curUser={"none"}
        songString={songSquare.songString}
        onDelete={this.deleteSongSquare}
        onCopy={this.copySongSquare}
        reFetch={this.componentDidMount}
        isDb={true}
      ></SongSquare>
    ));

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
      <div style={{ height: "100%", width: "100%" }}>
        {logBox}

        <Navbar
          bg="light"
          variant="light"
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
        <div
          id="haha"
          style={{
            margin: "O auto",
            width: "100%",
            height: 1920,
            padding: 100,
            textAlign: "center"
          }}
        >
          <b style={{ fontSize: 50 }}>Welcome to Kalimba Libre!</b>
          <div style={{ color: "grey" }}>
            Click 'Login' in the top right to create a completely free account!
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
