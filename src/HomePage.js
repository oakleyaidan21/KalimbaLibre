import React, { Component } from "react";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SongSquare from "./components/home-components/SongSquare";
import Form from "react-bootstrap/Form";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      songSquares: []
    };
    this.deleteSongSquare = this.deleteSongSquare.bind(this);
    this.copySongSquare = this.copySongSquare.bind(this);
  }

  copySongSquare = id => {
    var copy = this.state.songSquares[id];
    var temp = this.state.songSquares;
    temp.push({
      title: copy.title,
      key: copy.key,
      tempo: copy.tempo,
      length: copy.length,
      id: this.state.songSquares.length
    });
    this.setState({ songSquares: temp });
  };

  deleteSongSquare = id => {
    var temp = [];
    if (this.state.songSquares.length === 1) {
      this.setState({ songSquares: temp });
    } else {
      console.log("deleting: " + id);
      console.log(this.state.songSquares);
      temp = this.state.songSquares;
      temp.splice(id, 1);
      this.setState({ songSquares: temp });
    }
  };

  addSongSquare = () => {
    var temp = this.state.songSquares;
    temp.push({
      title: "none",
      key: "C",
      tempo: 120,
      length: 40,
      id: this.state.songSquares.length
    });
    this.setState({ songSquares: temp });
  };

  render() {
    console.log(this.state.songSquares);
    var squaresRendered = false;
    let squares;
    if (this.state.songSquares.length > 0) {
      squaresRendered = true;
    }

    if (squaresRendered) {
      squares = this.state.songSquares.map(songSquare => (
        <SongSquare
          title={songSquare.title}
          key={songSquare.key}
          tempo={songSquare.tempo}
          length={songSquare.length}
          id={songSquare.id}
          onDelete={this.deleteSongSquare}
          onCopy={this.copySongSquare}
        ></SongSquare>
      ));
    } else {
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
          You don't have any songs. Click on "+ Create" to start one!
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
            <Button
              variant="primary"
              href="/newtab"
              target="_blank"
              onClick={() => this.addSongSquare()}
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
