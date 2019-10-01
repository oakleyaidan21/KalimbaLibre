import React, { Component } from "react";
import Holder from "./components/display-components/holder";
import Selector from "./components/display-components/selector";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";
import AbcjsContainer from "./components/music-components/abcjsContainer";
import ConfigHolder from "./components/display-components/configHolder";
import { getInstruments } from "mobx-music";
import { delay } from "q";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: [{ passID: 1, passName: "D3" }],
      instrument: null,
      playingNotes: null,
      renderAbcjs: false,
      abcjsSong: ""
    };
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {}

  //returns a structure that the player can read
  convertSong = () => {
    var temp = [[]];
    for (var i = 0; i < this.state.song.length; i++) {
      temp.push([""]);
    }

    var curID = this.state.song[0].passID;
    console.log(curID);

    for (var j = 0; i < this.state.song.length; i++) {
      console.log("p");
      temp[this.state.song.passID] += this.state.song[i].passName + " ";
    }
    console.log("temp " + temp);
    // for (var i = 0; i < this.state.song.length; i++) {
    //   if(temp.indexOf())
    // }
  };

  handlePlay = async () => {
    const { instruments, playingNotes } = await getInstruments(["kalimba"]);
    const kalimba = instruments.get("kalimba");
    this.convertSong();

    for (var i = this.state.song.length - 1; i >= 0; i--) {
      await delay(1000);
      kalimba.play(this.state.song[i].passName, 500);
      playingNotes.get(this.state.song[i].passName);
    }

    console.log(kalimba);
  };

  handleLastPassUp = (passID, passName) => {
    var temp = this.state.song.concat({ passID, passName });
    temp.sort(function(a, b) {
      return a.passID - b.passID;
    });
    console.log(this.state.song);
    this.setState({ song: temp });
  };

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="localhost:3000">Kalimba Libre</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="localhost:3000">Export</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-info" onClick={this.handlePlay}>
              PLAY
            </Button>
          </Form>
        </Navbar>
        {/* <InfoContainer desc={"First container"}></InfoContainer>  */}

        <Selector style={{ topMargin: "0px" }} />
        <Holder onLastPassUp={this.handleLastPassUp} />
        {this.state.renderAbcjs ? (
          <AbcjsContainer
            isRendered={this.state.renderAbcjs}
            song={this.state.song}
          />
        ) : null}
        <ConfigHolder />
        {/* <ReactMobxMusic instrumentNames={["kalimba"]}>
          {({isLoading, instruments}) => 
        isLoading ? (<div>Loading</div>) 
        : (<div>Loaded!<button onClick={ () => {setTimeout(function() {
          console.log("wait");
          instruments.get("kalimba").play("A4");
        }, 2000);
         setTimeout(function() {
          console.log("wait");
          instruments.get("kalimba").play("B4");
        }, 2000); }}>Play</button></div>)}
        </ReactMobxMusic> */}
      </div>
    );
  }
}

export default App;
