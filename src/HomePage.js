import React, { Component } from "react";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SongSquare from "./components/home-components/SongSquare";
import Form from "react-bootstrap/Form";
import { Link } from "@reach/router";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      songSquares: [],
      curLocalStorage: [],
      didConnect: false
    };
  }

  parseText = data => {
    if (data !== null) {
      this.setState({ didConnect: true });
      for (var i = 0; i < data.length; i++) {
        if (data[i].username === "carrot") {
          var temp = this.state.songSquares;
          temp.push({
            title: data[i].title,
            keySig: data[i].keysig,
            tempo: data[i].tempo,
            length: data[i].length,
            id: data[i].id,
            songString: data[i].songString
          });
          this.setState({ songSquares: temp });
        }
      }
    }
  };

  componentDidMount = () => {
    fetch("http://localhost:3000/songs")
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
          songString={songSquare.songString}
          onDelete={this.deleteSongSquare}
          onCopy={this.copySongSquare}
        ></SongSquare>
      ));
    } else {
      var text = "You don't have any songs. Click on '+ Create' to start one!";
      if (this.state.didConnect === false) {
        text = "Could not connect to the database!";
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
            <Button variant="outline-primary">Login</Button>
          </Form>
        </Navbar>
        <div className="home-page">
          <b>
            Your Songs{" "}
            <Link to="/newtab/0" target="_blank">
              <Button variant="primary">+ Create</Button>
            </Link>
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
