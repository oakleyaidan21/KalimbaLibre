import React, { Component } from "react";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import SongSquare from "./components/home-components/SongSquare";
import Form from "react-bootstrap/Form";
import NewWindow from "react-new-window";
import NewTab from "./NewTab.js";

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
    var newtitle = this.state.songSquares[id].title + " (copy)";
    var temp = this.state.songSquares;
    temp.push({
      title: newtitle,
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

  addSongSquare = async () => {
    // await delay(500);
    // var temp = this.state.songSquares;
    // temp.push({
    //   title: "No Title",
    //   keySig: "C",
    //   tempo: 120,
    //   length: 40,
    //   id: this.state.songSquares.length
    // });
    // this.setState({ songSquares: temp });
  };

  parseText = data => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      if (data[i].username === "carrot") {
        var temp = this.state.songSquares;
        temp.push({
          title: data[i].title,
          keySig: data[i].keysig,
          tempo: data[i].tempo,
          length: data[i].length,
          id: data[i].id
        });
        this.setState({ songSquares: temp });
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
          keySig={songSquare.keySig}
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
              onClick={
                <NewWindow>
                  <NewTab></NewTab>
                </NewWindow>
              }
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
