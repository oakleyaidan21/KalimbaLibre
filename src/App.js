import React, { Component } from "react";
import Holder from "./components/holder";
import Selector from "./components/selector";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";
import { getInstruments } from "mobx-music";

class App extends Component {
  state = {
    song: ["C4", "D4", "E4", "F4", "G4"],
    instruments: null,
    playingNotes: null,
    instrument: null
  };

  async instrumentCall() {
    // {this.state.instruments, this.stateplayingNotes } = await getInstruments([
    //   "kalimba"
    // ]);
    this.setState(
      { instruments: await getInstruments(["kalimba"]) },
      { playingNotes: await getInstruments(["kalimba"]) }
    );

    this.setState({ instrument: this.instruments.get("kalimba") });
  }

  songLoop(index, iterableArray) {
    if (index >= iterableArray.length) {
      return;
    }

    console.log(iterableArray[index]);
    // this.state.instrument.play(iterableArray[index], 500);
    // this.state.playingNotes.get(iterableArray[index]);
    // setTimeout(() => {
    //   this.state.instrument.stop(this.state.song[index]);
    // }, 250);
    index++;
    setTimeout(this.songLoop.bind({}, index, iterableArray), 2000);
  }

  handlePlay = () => {
    this.songLoop(0, this.state.song);
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
        <Holder />
      </div>
    );
  }
}

export default App;
