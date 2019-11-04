import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import LoginBox from "./components/landing-components/LoginBox";
import NewAccountBox from "./components/landing-components/NewAccountBox";
import { navigate } from "@reach/router";

import SongSquare from "./components/home-components/SongSquare";

class SongDatabasePage extends Component {
  state = {
    showLogin: false,
    showNewAccount: false,
    songSquares: [],
    userID: this.props.location.state.userID
  };

  login = () => {
    console.log("pressed");
    this.setState({ showLogin: true });
  };

  //should eventually set this up to only retreive public songs
  parseText = data => {
    if (data != null) {
      var temp = [];
      this.setState({ didConnect: true });
      for (var i = 0; i < data.length; i++) {
        if (
          this.state.userID !== data[i].username &&
          (data[i].private == null || data[i].private === 0)
        ) {
          temp.push({
            title: data[i].title,
            keySig: data[i].keysig,
            tempo: data[i].tempo,
            length: data[i].length,
            id: data[i].id,
            songString: data[i].songString
          });
        }
      }
      this.setState({ songSquares: temp });
    }
  };

  componentDidMount = () => {
    fetch(process.env.REACT_APP_DB_LOCATION + "/ksongs")
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
    let songsLink;
    let logButton;
    console.log(this.state.userID);
    if (this.state.userID === 0) {
      logButton = (
        <Button
          variant="outline-primary"
          onClick={() => {
            this.login();
          }}
        >
          Login
        </Button>
      );
    } else {
      logButton = (
        <Button
          variant="outline-primary"
          onClick={() => {
            navigate("/");
          }}
          style={{ marginLeft: 10 }}
        >
          Logout
        </Button>
      );
      songsLink = (
        <Nav.Link
          onClick={() => {
            navigate("/homepage/", { state: { userID: this.state.userID } });
          }}
          style={{ marginLeft: 10 }}
        >
          Your Songs
        </Nav.Link>
      );
    }
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
    let squares = this.state.songSquares.map(songSquare => (
      <SongSquare
        title={songSquare.title}
        keySig={songSquare.keySig}
        tempo={songSquare.tempo}
        length={songSquare.length}
        id={songSquare.id}
        user={songSquare.username}
        curUser={this.state.userID}
        songString={songSquare.songString}
        onDelete={this.deleteSongSquare}
        onCopy={this.copySongSquare}
        reFetch={this.componentDidMount}
        isDb={true}
      ></SongSquare>
    ));
    return (
      <div>
        {logBox}
        <Navbar
          bg="dark"
          variant="dark"
          style={{ position: "relative", zIndex: 5 }}
        >
          <Navbar.Brand href="/">Kalimba Libre</Navbar.Brand>
          <Nav className="mr-auto">
            {songsLink}
            <Nav.Link>About</Nav.Link>
            <Nav.Link
              href="https://github.com/oakleyaidan21/KalimbaLibre"
              target="_blank"
            >
              Github
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search Songs"
              className="mr-sm-2"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Form inline>{logButton}</Form>
        </Navbar>
        <div className="home-page">
          <b>Songs</b>
          <div style={{ height: 2, backgroundColor: "grey" }}></div>
          {squares}
        </div>
      </div>
    );
  }
}

export default SongDatabasePage;
