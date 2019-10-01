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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: [{ passID: 1, passName: "D3" }],
      instruments: null,
      playingNotes: null,
      renderAbcjs: false,
      abcjsSong: ""
    };
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {}

  handlePlay = instruments => {
    console.log("play clicked");
  };

  handleLastPassUp = (passID, passName) => {
    var temp = this.state.song.concat({ passID, passName });
    temp.sort(function(a, b) {
      return a.passID - b.passID;
    });
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
