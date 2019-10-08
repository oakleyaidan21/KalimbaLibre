import React, { Component } from "react";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SongSquare from "./components/home-components/SongSquare";

class HomePage extends Component {
  state = {
    songSquares: []
  };

  addSongSquare = () => {
    var temp = this.state.songSquares;
    temp.push({ title: "none", key: "C", tempo: 120, length: 40 });
    this.setState({ songSquares: temp });
  };
  render() {
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
        </Navbar>
        <div className="home-page">
          <b>
            Your Songs{" "}
            <Button
              variant="primary"
              href="/newtab"
              onClick={() => this.addSongSquare()}
            >
              +Create
            </Button>
          </b>
          {/* just a line break */}
          <div style={{ height: 2, backgroundColor: "grey" }}></div>
          {/* <SongSquare></SongSquare> */}
          {this.state.songSquares.map(songSquare => (
            <SongSquare
              title={songSquare.title}
              key={songSquare.key}
              tempo={songSquare.tempo}
              length={songSquare.length}
            ></SongSquare>
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
