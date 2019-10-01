import React, { Component } from "react";
import Holder from "./components/holder";
import Selector from "./components/selector";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";
import AbcjsContainer from "./components/abcjsContainer";

class App extends Component {
  state = {
    song: [{ passID: 1, passName: "D3" }],
    instruments: null,
    renderAbcjs: false,
    abcjsSong: ""
  };

  handlePlay = () => {
    // console.log("rendering abcjs");
    this.setState({ renderAbcjs: true });
  };

  handleLastPassUp = (passID, passName) => {
    var temp = this.state.song.concat({ passID, passName });
    temp.sort(function(a, b) {
      return a.passID - b.passID;
    });
    this.setState({ song: temp });
    // console.log(this.state.song);
  };

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="localhost:3000">Kalimba Libre</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="localhost:3000">Home</Nav.Link>
            <Nav.Link href="localhost:3000">Configure</Nav.Link>
            <Nav.Link href="localhost:3000">Export</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-info" onClick={this.handlePlay}>
              PLAY
            </Button>
          </Form>
        </Navbar>

        <Selector style={{ topMargin: "0px" }} />
        <Holder onLastPassUp={this.handleLastPassUp} />
        {this.state.renderAbcjs ? (
          <AbcjsContainer
            isRendered={this.state.renderAbcjs}
            song={this.state.song}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
