import React, { Component } from "react";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SongSquare from "./components/home-components/SongSquare";
import Form from "react-bootstrap/Form";
import { Link } from "@reach/router";
import dbLocation from "./localVariables";
import { navigate } from "@reach/router";
import SongCreator from "./components/home-components/SongCreator";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songSquares: [],
      curLocalStorage: [],
      didConnect: false,
      user: this.props.location.state.userID,
      showCreateBox: false
    };
  }

  parseText = data => {
    if (data != null) {
      var temp = [];
      this.setState({ didConnect: true });
      for (var i = 0; i < data.length; i++) {
        if (data[i].username === this.state.user) {
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
      this.setState({ songSquares: temp });
    }
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
    var squaresRendered = false;
    let squares;
    if (this.state.songSquares.length > 0) {
      squaresRendered = true;
    }

    if (squaresRendered) {
      squares = this.state.songSquares.map(songSquare => (
        <SongSquare
          title={songSquare.title}
          keySig={songSquare.keySig}
          tempo={songSquare.tempo}
          length={songSquare.length}
          id={songSquare.id}
          curUser={"none"}
          user={this.state.user}
          songString={songSquare.songString}
          private={songSquare.private}
          onDelete={this.deleteSongSquare}
          onCopy={this.copySongSquare}
          reFetch={this.componentDidMount}
        ></SongSquare>
      ));
    } else {
      var text =
        "You don't have any songs. Click on '+ Create' to start one, or refresh the page to see your new ones!";
      if (this.state.didConnect === false) {
        text = "Could not connect to the database! Try refreshing?";
      }
      squares = (
        <div
          style={{
            height: 500,
            width: 600,
            fontSize: 20,
            textAlign: "center",
            margin: "0 auto",
            marginTop: 300,
            color: "grey"
          }}
        >
          {text}
        </div>
      );
    }

    let createBox = (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(128,128,128,0.5)",
          zIndex: 7
        }}
      >
        <SongCreator
          user={this.state.user}
          onCancel={() => {
            this.setState({ showCreateBox: false });
          }}
        ></SongCreator>
      </div>
    );
    if (!this.state.showCreateBox) {
      createBox = <></>;
    }

    return (
      <div style={{ height: "100%", width: "100%" }}>
        {createBox}
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Kalimba Libre</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link
              onClick={() => {
                navigate("/database/", { state: { userID: this.state.user } });
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
            <Link to="/">
              <Button variant="outline-primary">Logout</Button>
            </Link>
          </Form>
        </Navbar>
        <div className="home-page">
          <b>
            {this.state.user}'s Songs{" "}
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ showCreateBox: true });
              }}
            >
              + Create
            </Button>
          </b>

          {/* just a line break */}
          <div style={{ height: 2, backgroundColor: "grey" }}></div>

          {squares}
        </div>
      </div>
    );
  }
}

export default HomePage;
