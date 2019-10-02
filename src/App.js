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
      song: [],
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
    console.log(this.state.song);
    var temp = [[]];
    var len = 0;
    if (
      this.state.song.length >
      this.state.song[this.state.song.length - 1].passID
    ) {
      len = this.state.song.length;
    } else {
      len = this.state.song[this.state.song.length - 1].passID;
    }
    for (var i = 0; i < len; i++) {
      temp.push([]);
    }

    for (var j = 0; j < this.state.song.length; j++) {
      temp[this.state.song[j].passID].push(this.state.song[j].passName);
    }

    return temp;
  };

  handlePlay = async () => {
    if (this.state.song.length !== 0) {
      const { instruments, playingNotes } = await getInstruments(["kalimba"]);
      const kalimba = instruments.get("kalimba");
      var songArray = this.convertSong();
      console.log(songArray);

      for (var i = songArray.length - 1; i >= 0; i--) {
        await delay(500);
        for (var j = 0; j < songArray[i].length; j++) {
          kalimba.play(songArray[i][j], 1000);
          playingNotes.get(songArray[i][j]);
        }
      }

      console.log(kalimba);
    }
  };

  handleLastPassUp = (passID, passName, color) => {
    if (color === "purple") {
      console.log("thing to remove: " + passID + " " + passName);

      // var index = this.state.song.indexOf({ passID, passName });
      var index = this.state.song.findIndex(
        element => element.passID === passID && element.passName === passName
      );
      console.log("thing it thinks it's removing: " + index);
      this.state.song.splice(index, 1);
    } else {
      var temp = this.state.song.concat({ passID, passName });
      temp.sort(function(a, b) {
        return a.passID - b.passID;
      });

      console.log(this.state.song);
      this.setState({ song: temp });
    }
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
