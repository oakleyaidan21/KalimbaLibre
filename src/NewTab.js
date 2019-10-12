import React, { Component } from "react";
import KalimbaContainer from "./components/display-components/KalimbaContainer";
import Selector from "./components/display-components/Selector";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";
import ConfigContainer from "./components/display-components/ConfigContainer";
import { getInstruments } from "mobx-music";
import { delay } from "q";
import scaleKeys from "./constants.js";
import Quarter from "./noteImages/quarter_note.png";
import Eighth from "./noteImages/eighth_note.png";
import Half from "./noteImages/half_note.png";
import Sixteenth from "./noteImages/sixteenth_note.png";
import D_Half from "./noteImages/dotted_half.png";
import D_Eighth from "./noteImages/dotted_eighth.png";
import D_Quarter from "./noteImages/dotted_quarter.png";
import Whole from "./noteImages/whole_note.png";

class NewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tineNotes: [
        { note: "D6", color: "white", len: 1, id: 1 },
        { note: "B5", color: "white", len: 2, id: 2 },
        { note: "G5", color: "rgb(0,123,255)", len: 3, id: 3 },
        { note: "E5", color: "white", len: 4, id: 4 },
        { note: "C5", color: "white", len: 5 },
        { note: "A4", color: "rgb(0,123,255)", len: 6, id: 6 },
        { note: "F4", color: "white", len: 7, id: 7 },
        { note: "D4", color: "white", len: 8, id: 8 },
        { note: "C4", color: "rgb(0,123,255)", len: 9, id: 9 },
        { note: "E4", color: "white", len: 8, id: 10 },
        { note: "G4", color: "white", len: 7, id: 11 },
        { note: "B4", color: "rgb(0,123,255)", len: 6, id: 12 },
        { note: "D5", color: "white", len: 5, id: 13 },
        { note: "F5", color: "white", len: 4, id: 14 },
        { note: "A5", color: "rgb(0,123,255)", len: 3, id: 15 },
        { note: "C6", color: "white", len: 2, id: 16 },
        { note: "E6", color: "white", len: 1, id: 17 }
      ],
      totalNotes: [],
      kalimbaLength: 200, //will change to get from router props
      kalimba: null,
      tempo: 120, //will change to get from router props
      keySig: "C", //will change to get from router props
      songTitle: "None", //will change to get from router props
      curTime: 4,
      songString: "None", //will change to get from router props
      isSaved: true,
      idToPlayUntil: -1,
      images: [
        { time: 1, image: Whole },
        { time: 4 / 3, image: D_Half },
        { time: 2, image: Half },
        { time: 8 / 3, image: D_Quarter },
        { time: 4, image: Quarter },
        { time: 16 / 3, image: D_Eighth },
        { time: 8, image: Eighth },
        { time: 16, image: Sixteenth }
      ],
      dbID: this.props.dbID
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.changeNoteTime = this.changeNoteTime.bind(this);
    this.configure = this.configure.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  getImageIndex = time => {
    for (var i = 0; i < this.state.images.length; i++) {
      if (this.state.images[i].time === parseFloat(time)) {
        return this.state.images[i].image;
      }
    }
    return this.state.images[0].image;
  };

  //changes the current note for editing
  //current problem: doesn't render images of dotted notes, for whatever reason
  changeNoteTime = childData => {
    console.log(childData);
    if (childData === ".") {
      var t = this.state.curTime;
      var addition = (t + t) / 3;
      console.log(addition);
      this.setState({ curTime: addition });
    } else {
      this.setState({ curTime: childData });
    }
  };

  //parses song data from the ruby API
  reRenderSongData = data => {
    var temp = "none";
    for (var a = 0; a < data.length; a++) {
      if (data[a].id === parseInt(this.props.dbID)) {
        this.setState({
          songTitle: data[a].title,
          keySig: data[a].keysig,
          tempo: data[a].tempo,
          kalimbaLength: data[a].length
        });
        temp = data[a].songString;
        this.setState({ songString: temp });
      }
    }

    temp = temp.split(",");
    var tempTNotes = [];
    // first, initialize all the tNotes
    for (var i = 0; i < this.state.kalimbaLength; i++) {
      var tempN = [];
      for (var j = 0; j < 17; j++) {
        tempN.push({
          time: 4,
          rest: false,
          name: this.state.tineNotes[j].note,
          color: "transparent",
          selected: false,
          noteID: j,
          imageToRender: Whole
        });
      }
      tempTNotes.push({
        key: i,
        time: 4,
        rest: false,
        color: "transparent",
        id: i,
        notes: tempN
      });
    }
    //now, go through song string and change tnote array accordingly
    for (i = 1; i < temp.length; i++) {
      var temp2 = temp[i].split(" ");
      var tNoteID = parseInt(temp2[0]);
      for (j = 1; j < temp2.length - 1; j++) {
        if (temp2[j] != null) {
          var temp3 = temp2[j].split("|");
          if (temp3 != null || temp3.length !== 1) {
            var noteName = temp3[0];
            var noteTime = temp3[1];
            var noteID = temp3[2];

            if (noteName != null || noteName !== "") {
              tempTNotes[tNoteID].notes[noteID].selected = true;
              tempTNotes[tNoteID].notes[noteID].time = noteTime;
              tempTNotes[tNoteID].notes[noteID].name = noteName;
              tempTNotes[tNoteID].notes[
                noteID
              ].imageToRender = this.getImageIndex(noteTime);
              this.setState({ idToPlayUntil: tNoteID });
            }
          }
        }
      }
    }
    //setstate
    this.setState({ totalNotes: tempTNotes });
  };

  //initialization
  componentDidMount = async () => {
    //fetches song data from API if it is not a new song
    if (this.props.dbID !== "0") {
      fetch("https://warm-inlet-29455.herokuapp.com/kalimba_songs")
        .then(
          data => {
            return data.json();
          },
          err => console.log(err)
        )
        .then(
          parsedData => this.reRenderSongData(parsedData),
          err => console.log(err)
        );
    } else {
      //initialize tnotes regularly
      var tempTNotes = [];
      for (var i = 0; i < this.state.kalimbaLength; i++) {
        var tempN = [];
        for (var j = 0; j < 17; j++) {
          tempN.push({
            time: 4,
            rest: false,
            name: this.state.tineNotes[j].note,
            color: "transparent",
            selected: false,
            noteID: j,
            imageToRender: Whole
          });
        }
        tempTNotes.push({
          key: i,
          time: 4,
          rest: false,
          color: "transparent",
          id: i,
          notes: tempN
        });
      }
      this.setState({ totalNotes: tempTNotes });
    }

    //Instrument Initilization
    await delay(500);
    const { instruments } = await getInstruments(["kalimba"]);
    this.setState({ kalimba: instruments.get("kalimba") });
    console.log("kalimba loaded");

    //Sets the KalimbaContainer to be scrolled down by default
    var myDiv = document.getElementById("holder");
    myDiv.scrollTop = myDiv.scrollHeight;
  };

  //goes through each TotalNote and plays the selected notes
  handlePlay = async () => {
    console.log(this.state.kalimba);
    var smallestTimeInterval = 4;
    var temp = this.state.totalNotes;
    var counter = 1;
    console.log(this.state.idToPlayUntil);
    for (var i = temp.length - 1; i >= this.state.idToPlayUntil; i--) {
      if (i === -1) {
        break;
      }
      if (smallestTimeInterval < 0) {
        smallestTimeInterval = 4;
      }
      var d = (4 * (1000 / (this.state.tempo / 60))) / smallestTimeInterval;
      smallestTimeInterval = 1;
      console.log(d);
      await delay(d);
      if (i !== temp.length - 1) {
        temp[i + 1].color = "transparent";
      }
      if (i === 0) {
        break;
      }
      temp[i].color = "rgb(247,255,0,0.5)";
      this.setState({ totalNotes: temp });
      for (var j = 0; j < 14; j++) {
        if (temp[i].notes[j].selected) {
          this.state.kalimba.play(temp[i].notes[j].name);
          if (temp[i].notes[j].time > smallestTimeInterval) {
            smallestTimeInterval = temp[i].notes[j].time;
          }
        }
      }

      document.getElementById("holder").scrollTop =
        temp.length * 40 - 250 - 40 * counter;
      counter++;
    }
    if (this.state.idToPlayUntil !== -1) {
      temp[this.state.idToPlayUntil].color = "transparent";
      this.setState({ totalNotes: temp });
    } else {
      temp[0].color = "transparent";
      this.setState({ totalNotes: temp });
    }
  };

  //Configures the title, key signature, and tempo
  configure = (value, type) => {
    this.setState({ isSaved: false });
    if (type === "title") {
      console.log(value);
      this.setState({ songTitle: value });
      return;
    }
    if (type === "key") {
      this.setState({ keySig: value });
      console.log(value);
      var index = 0;
      for (var i = 0; i < scaleKeys.keySignatures.length; i++) {
        if (scaleKeys.keySignatures[i][0] === value) {
          index = i;
          break;
        }
      }
      var temp = this.state.tineNotes;
      for (var j = 0; j < temp.length; j++) {
        temp[j].note = scaleKeys.keySignatures[index][j + 1];
        console.log(temp[j].note);
      }
      this.setState({ tineNotes: temp });
      return;
    }
    if (type === "tempo") {
      this.setState({ tempo: value });
      return;
    }
  };

  //converts the song into a text file for download
  //might get rid of soon
  handleNoteExport = save => {
    const element = document.createElement("a");

    var temp =
      this.state.songTitle +
      ",\n" +
      this.state.keySig +
      ",\n" +
      this.state.tempo +
      ",\n" +
      this.state.kalimbaLength +
      ",\n";
    var sequence = "";
    for (var i = this.state.totalNotes.length - 1; i >= 0; i--) {
      sequence += i + " ";
      for (var j = 0; j < this.state.totalNotes[i].notes.length; j++) {
        if (this.state.totalNotes[i].notes[j].selected === true) {
          sequence +=
            this.state.totalNotes[i].notes[j].name +
            "|" +
            this.state.totalNotes[i].notes[j].time +
            "|" +
            this.state.totalNotes[i].notes[j].noteID +
            " ";
        }
      }
      if (sequence !== "0") {
        sequence += ",\n";
      }
    }
    temp += sequence;
    if (save) {
      const file = new Blob([temp], {
        type: "text/plain"
      });
      element.href = URL.createObjectURL(file);
      element.download = this.state.songTitle;
      document.body.appendChild(element);
      element.click();
    }

    return temp;
  };

  //the last of the functions that retrieve note data. sets this state's note data
  handleLastPassUp = (tNote, noteName, time, remove, noteID) => {
    var temp2 = this.state.totalNotes;
    if (remove) {
      console.log(tNote + " " + noteID);
      temp2[tNote].notes[noteID].selected = false;
    } else {
      console.log(tNote + " " + noteID);
      temp2[tNote].notes[noteID].selected = true;
      temp2[tNote].notes[noteID].time = time;
    }

    if (this.state.idToPlayUntil === -1) {
      this.setState({ idToPlayUntil: tNote });
    } else {
      if (this.state.idToPlayUntil > tNote) {
        this.setState({ idToPlayUntil: tNote });
      }
    }
    temp2[tNote].notes[noteID].name = noteName;
    this.setState({ totalNotes: temp2 });
    this.setState({ isSaved: false });
  };

  handleSave = () => {
    var concat = "";
    var method = "POST";
    if (this.props.dbID !== "0") {
      concat = "/" + this.props.dbID;
      method = "PUT";
    }
    var songS = this.handleNoteExport(false);
    fetch("https://warm-inlet-29455.herokuapp.com/kalimba_songs" + concat, {
      method: method,
      body: JSON.stringify({
        title: this.state.songTitle,
        keysig: this.state.keySig,
        tempo: this.state.tempo,
        length: this.state.kalimbaLength,
        songString: songS,
        username: "carrot"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(resJSON => {
        console.log("got here");
        console.log(resJSON);
      })
      .catch(error => console.error({ Error: error }));
    this.setState({ isSaved: true });
  };

  render() {
    let vari = "outline-info";
    if (this.state.isSaved === false) {
      vari = "primary";
    }
    let saveButton = (
      <Button
        variant={vari}
        onClick={() => {
          this.handleSave();
        }}
        style={{ marginRight: 10 }}
      >
        Save
      </Button>
    );

    // console.log("dbid: " + this.state.dbID);

    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Kalimba Libre</Navbar.Brand>
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
            <div id="navtop">
              <Button
                id="my-input"
                variant="outline-info"
                onClick={() => {
                  this.handleNoteExport(true);
                }}
                style={{ marginRight: 10 }}
              >
                Export to TXT
              </Button>
              <Button
                onClick={() => {
                  this.refs.child.handleScrollBottom();
                }}
                id="my-input"
                variant="outline-info"
                style={{ marginRight: 10 }}
              >
                To Bottom
              </Button>
            </div>
            {saveButton}
            <Button variant="primary" onClick={this.handlePlay}>
              PLAY
            </Button>
          </Form>
        </Navbar>

        <KalimbaContainer
          onLastPassUp={this.handleLastPassUp}
          amountOfTNotes={this.state.kalimbaLength}
          totalNotes={this.state.totalNotes}
          tineNotes={this.state.tineNotes}
          kalimba={this.state.kalimba}
          tempo={this.state.tempo}
          playing={this.state.playing}
          ref="child"
          curTime={this.state.curTime}
          imageToRender={this.state.imageToRender}
        />
        <Selector
          onChangeNoteTime={this.changeNoteTime}
          curNote={this.state.curTime}
        />
        <ConfigContainer
          title={this.state.songTitle}
          keySig={this.state.keySig}
          time={this.state.time}
          tempo={this.state.tempo}
          onConfigButton={this.configure}
          song={this.state.songString}
        />
      </div>
    );
  }
}

export default NewTab;
