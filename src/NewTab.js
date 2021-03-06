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
import scaleKeys, { tineNotesC } from "./constants.js";
import Quarter from "./noteImages/quarter_note.png";
import Eighth from "./noteImages/eighth_note.png";
import Half from "./noteImages/half_note.png";
import Sixteenth from "./noteImages/sixteenth_note.png";
import D_Half from "./noteImages/dotted_half.png";
import D_Eighth from "./noteImages/dotted_eighth.png";
import D_Quarter from "./noteImages/dotted_quarter.png";
import Whole from "./noteImages/whole_note.png";
import LoadingScreen from "./components/home-components/LoadingScreen";
import { navigate } from "@reach/router";

class NewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tineNotes: tineNotesC,
      totalNotes: [],
      kalimbaLength: 200, //will change to get from router props
      kalimba: null,
      tempo: 120, //will change to get from router props
      keySig: "C", //will change to get from router props
      songTitle: this.props.location.state.passedTitle, //will change to get from router props
      curTime: 4,
      resting: false,
      songString: "None", //will change to get from router props
      isSaved: true,
      isLoading: true,
      isPlaying: false,
      idToPlayUntil: -1,
      idToStartFrom: 0,
      stopPlaying: false,
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
      dbID: this.props.location.state.dbID,
      userID: this.props.location.state.userID,
      hovered: false,
      tieMode: false,
      tiedNote: []
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
    if (this.state.tieMode) {
      console.log("tie " + childData);
      var temp = this.state.tiedNote;
      temp.push(childData);
      this.setState({ tiedNote: temp });
    } else {
      if (childData !== "R") {
        if (childData === ".") {
          var t = this.state.curTime;
          var addition = (t + t) / 3;
          this.setState({ curTime: addition });
        } else {
          this.setState({ curTime: childData });
        }
        this.setState({ resting: false });
      } else {
        this.setState({ resting: true });
      }
    }
  };

  //parses song data from the ruby API and rerenders it
  reRenderSongData = data => {
    var temp = "none";
    for (var a = 0; a < data.length; a++) {
      if (data[a].id === parseInt(this.state.dbID)) {
        this.setState({
          songTitle: data[a].title,
          keySig: data[a].keysig,
          tempo: data[a].tempo,
          kalimbaLength: data[a].length,
          idToStartFrom: data[a].length - 1
        });
        this.configure(data[a].keysig, "key");
        temp = data[a].songString;
        this.setState({ songString: temp });
      }
    }

    temp = temp.split(",");
    var tempTNotes = [];
    // first, initialize all the tNotes
    for (var i = 0; i < this.state.kalimbaLength; i++) {
      var cur = false;
      if (i === this.state.kalimbaLength - 1) {
        cur = true;
      }
      var tempN = [];
      for (var j = 0; j < 17; j++) {
        tempN.push({
          time: 4,
          rest: false,
          name: this.state.tineNotes[j].note,
          color: "transparent",
          selected: false,
          noteID: j,
          imageToRender: this.getImageIndex(this.time)
        });
      }
      tempTNotes.push({
        key: i,
        time: 4,
        rest: false,
        color: "transparent",
        selected: false,
        id: i,
        notes: tempN,
        current: cur
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
              tempTNotes[tNoteID].notes[noteID].time = parseFloat(noteTime);
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
    this.setState({ isSaved: true });
  };

  //initialization
  componentDidMount = async () => {
    //fetches song data from API if it is not a new song
    if (this.state.dbID !== 0) {
      fetch(process.env.REACT_APP_DB_LOCATION + "/ksongs")
        .then(
          data => {
            return data.json();
          },
          err => console.log(err)
        )
        .then(
          parsedData => {
            this.reRenderSongData(parsedData);
          },
          err => console.log(err)
        );
    } else {
      //first, set the keysignature
      await delay(500);
      console.log("got here");
      this.configure(this.props.location.state.passedKeySig, "key");
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
          notes: tempN,
          current: false
        });
      }
      this.setState({ totalNotes: tempTNotes });
    }

    //Instrument Initilization
    const { instruments } = await getInstruments(["kalimba"]);
    this.setState({ kalimba: instruments.get("kalimba") });
    console.log("kalimba loaded");

    //Sets the KalimbaContainer to be scrolled down by default
    this.setState({ isLoading: false });
    var myDiv = document.getElementById("holder");
    myDiv.scrollTop = myDiv.scrollHeight;
  };

  //goes through each TotalNote and plays the selected notes
  handlePlay = async () => {
    if (this.state.idToPlayUntil === -1) {
      return;
    }
    this.setState({ isPlaying: true });
    document.getElementById("holder").style.scrollBehavior = "auto";
    var notesToPlay = [];
    var temp = this.state.totalNotes;
    for (var i = 0; i < temp.length; i++) {
      notesToPlay.push([]);
      for (var j = 0; j < 17; j++) {
        if (temp[i].notes[j].selected) {
          notesToPlay[i].push({
            name: temp[i].notes[j].name,
            time: temp[i].notes[j].time
          });
        }
      }
    }
    var smallestTimeInterval = 4;

    for (i = this.state.idToStartFrom; i >= this.state.idToPlayUntil; i--) {
      if (this.state.stopPlaying) {
        temp[i + 1].color = "transparent";
        this.setState({ totalNotes: temp });
        break;
      }
      if (smallestTimeInterval < 0) {
        smallestTimeInterval = 4;
      }
      var d = (4 * (1000 / (this.state.tempo / 60))) / smallestTimeInterval;
      smallestTimeInterval = 1;
      await delay(d);
      if (i !== temp.length - 1) {
        temp[i + 1].color = "transparent";
      }

      temp[i].color = "rgb(247,255,0,0.5)";
      this.setState({ totalNotes: temp });
      for (j = 0; j < notesToPlay[i].length; j++) {
        this.state.kalimba.play(notesToPlay[i][j].name);
        if (notesToPlay[i][j].time > smallestTimeInterval) {
          smallestTimeInterval = notesToPlay[i][j].time;
        }
      }
      document.getElementById("holder").scrollTop =
        temp.length * 40 - 250 - 40 * (this.state.kalimbaLength - i);
    }

    await delay(500);
    temp[this.state.idToPlayUntil].color = "transparent";
    this.setState({ totalNotes: temp });

    document.getElementById("holder").style.scrollBehavior = "smooth";
    this.setState({ stopPlaying: false });
    this.setState({ isPlaying: false });
  };

  //Configures the title, key signature, and tempo
  configure = (value, type) => {
    this.setState({ isSaved: false });
    if (type === "title") {
      this.setState({ songTitle: value });
      return;
    }
    if (type === "key") {
      console.log("doing this");
      this.setState({ keySig: value });
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
    this.setState({ tieMode: false, tiedNote: [] });
    var temp2 = this.state.totalNotes;
    if (remove) {
      temp2[tNote].notes[noteID].selected = false;
    } else {
      temp2[tNote].notes[noteID].selected = true;
      temp2[tNote].notes[noteID].time = time;
      temp2[tNote].notes[noteID].imageToRender = this.getImageIndex(time);
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
    this.setState({ idToStartFrom: tNote });
  };

  handleSave = () => {
    var concat = "/";
    var method = "POST";
    if (this.state.dbID !== 0) {
      concat = "/" + this.state.dbID + "/";
      method = "PUT";
    } else {
      concat = "/";
    }
    var priv = window.confirm(
      "Do you want to make your song private? (won't show up in public database) (cancel to save it publicly)"
    );
    if (priv) {
      priv = 1;
    } else {
      priv = 0;
    }
    var songS = this.handleNoteExport(false);
    console.log("making it " + priv);
    fetch(process.env.REACT_APP_DB_LOCATION + "/ksongs" + concat, {
      method: method,
      body: JSON.stringify({
        title: this.state.songTitle,
        keysig: this.state.keySig,
        tempo: this.state.tempo,
        length: this.state.kalimbaLength,
        songString: songS,
        username: this.state.userID,
        private: priv
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(resJSON => {
        console.log(resJSON);
        this.setState({ dbID: resJSON.id });
      })
      .catch(error => console.error({ Error: error }));
    this.setState({ isSaved: true });
  };

  addMeasure = id => {
    var temp = this.state.totalNotes;
    var notesToInsert = [];
    for (var i = 0; i < 17; i++) {
      notesToInsert.push({
        time: 4,
        rest: false,
        name: this.state.tineNotes[i].note,
        color: "transparent",
        selected: false,
        noteID: i,
        imageToRender: Whole
      });
    }
    var toInsert = {
      key: id - 1,
      time: 4,
      rest: false,
      color: "transparent",
      selected: "false",
      id: id + 1,
      notes: notesToInsert
    };
    temp.splice(id, 0, toInsert);
    for (i = id; i < temp.length; i++) {
      temp[i].key++;
      temp[i].id++;
      for (var j = 0; j < 17; j++) {
        temp[i].notes[j].imageToRender = this.getImageIndex(
          temp[i].notes[j].time
        );
      }
    }
    this.setState({ totalNotes: temp });
    this.setState({ kalimbaLength: this.state.kalimbaLength + 1 });
  };

  removeMeasure = id => {
    var temp = this.state.totalNotes;
    temp.splice(id, 1);
    for (var i = id; i < temp.length; i++) {
      temp[i].key--;
      temp[i].id--;
      for (var j = 0; j < 17; j++) {
        temp[i].notes[j].imageToRender = this.getImageIndex(
          temp[i].notes[j].time
        );
      }
    }
    this.setState({ totalNotes: temp });
    this.setState({ kalimbaLength: this.state.kalimbaLength - 1 });
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
    if (this.props.location.state.dev) {
      saveButton = <></>;
    }
    let rend = <LoadingScreen />;
    if (!this.state.isLoading) {
      rend = <></>;
    }

    let stopButton = (
      <Button
        variant="outline-info"
        onClick={() => {
          this.setState({ stopPlaying: true });
        }}
      >
        STOP
      </Button>
    );
    if (!this.state.isPlaying) {
      stopButton = (
        <Button variant="primary" onClick={this.handlePlay}>
          PLAY
        </Button>
      );
    }

    return (
      <div className="App">
        {rend}
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Kalimba Libre</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link
              onClick={() => {
                navigate("/homepage/", {
                  state: { userID: this.state.userID, dbID: this.state.dbID }
                });
              }}
            >
              Your Songs
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/database/", {
                  state: { userID: this.state.userID }
                });
              }}
            >
              Song Database
            </Nav.Link>
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
                  var temp = this.state.totalNotes;
                  this.setState({
                    idToStartFrom: this.state.kalimbaLength - 1,
                    totalNotes: temp
                  });
                }}
                id="my-input"
                variant="outline-info"
                style={{ marginRight: 10 }}
              >
                To Bottom
              </Button>
            </div>
            {saveButton}
            {stopButton}
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
          isRest={this.state.resting}
          curTime={this.state.curTime}
          imageToRender={this.state.imageToRender}
          finalTickPass={this.addMeasure}
          finalMinusPass={this.removeMeasure}
          tieMode={this.state.tieMode}
          tiedNote={this.state.tiedNote}
          toggleTied={() => {
            this.setState({ tieMode: false, tiedNote: [] });
          }}
        />
        <Selector
          onChangeNoteTime={this.changeNoteTime}
          curNote={this.state.curTime}
          onTieSelection={() => {
            if (this.state.tieMode) {
              this.setState({ tieMode: false });
            } else {
              this.setState({ tieMode: true });
            }
          }}
          tieMode={this.state.tieMode}
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
