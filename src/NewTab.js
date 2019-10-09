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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import scaleKeys from "./constants.js";

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
      kalimbaLength: 40, //will change to get from router props
      kalimba: null,
      tempo: 120, //will change to get from router props
      keySig: "C", //will change to get from router props
      songTitle: "None", //will change to get from router props
      curTime: 4,
      songNotes: [[]],
      songString: "None", //will change to get from router props
      isSaved: true,
      idToPlayUntil: -1
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.changeNoteTime = this.changeNoteTime.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.configure = this.configure.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

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
    console.log(this.state.curTime);
  };

  componentDidMount = async () => {
    //instrument stuff
    await delay(500);
    const { instruments } = await getInstruments(["kalimba"]);
    this.setState({ kalimba: instruments.get("kalimba") });
    console.log("kalimba loaded");
    //export txt stuff
    var temp = this.createEmptyArray(this.state.kalimbaLength, [
      { noteName: "A3", time: 4 }
    ]);
    this.setState({ songNotes: temp });
    //scroll stuff
    var myDiv = document.getElementById("holder");
    myDiv.scrollTop = myDiv.scrollHeight;
    //tnote stuff
    //child initilization stuff
    var tempT = [];
    for (var i = 0; i < 40; i++) {
      var tempN = [];
      for (var j = 0; j < 14; j++) {
        tempN.push({
          time: 4,
          rest: false,
          name: this.state.tineNotes[j].note,
          color: "transparent",
          selected: false,
          noteID: j
        });
      }
      tempT.push({
        key: i,
        time: 4,
        rest: false,
        color: "transparent",
        id: i,
        notes: tempN
      });
    }
    this.setState({ totalNotes: tempT });
  };

  //can probably handle the page issue by having it image the holder, then manually scroll up and do it again
  handleExport = () => {
    var input = document.getElementById("holder");
    html2canvas(input).then(canvas => {
      let pdf = new jsPDF("p", "mm", "a4");
      for (var i = 0; i < 4; i++) {
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          500 * i,
          211,
          298
        );
        if (i > 0 || i !== 3) {
          pdf.addPage();
        }
      }

      pdf.save("kalimba.pdf");
    });
    input.scrollTop = input.scrollHeight;
  };

  getSmallestTimeInterval = array => {
    return Math.max.apply(
      Math,
      array.map(function(o) {
        return o.time;
      })
    );
  };

  handlePlay = async () => {
    console.log(this.state.kalimba);
    var smallestTimeInterval = 4;
    var temp = this.state.totalNotes;
    var counter = 1;
    console.log(this.state.idToPlayUntil);
    for (var i = temp.length - 1; i >= this.state.idToPlayUntil; i--) {
      console.log("go");
      if (i === -1) {
        break;
      }
      if (smallestTimeInterval < 0) {
        smallestTimeInterval = 4;
      }
      var d = (4 * (1000 / (this.state.tempo / 60))) / smallestTimeInterval;
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
        }
      }
      smallestTimeInterval = this.getSmallestTimeInterval(temp[i].notes);
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

  configure = (value, type) => {
    if (type === "title") {
      console.log(value);
      this.setState({ songTitle: value });
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
    }
    if (type === "time") {
      this.setState({ time: value });
    }
    if (type === "tempo") {
      this.setState({ tempo: value });
    }
    if (type === "songString") {
      this.setState({ songString: value });
      this.reRenderSong(value);
    }
    this.setState({ isSaved: false });
  };

  handleNoteExport = save => {
    const element = document.createElement("a");
    var temp =
      this.state.songTitle +
      ", \n" +
      this.state.keySig +
      ", \n" +
      this.state.tempo +
      ", \n" +
      this.state.kalimbaLength +
      ", \n";
    var sequence = "";
    for (var i = this.state.songNotes.length - 1; i >= 0; i--) {
      sequence += i + " ";
      for (var j = 1; j < this.state.songNotes[i].length; j++) {
        sequence +=
          this.state.songNotes[i][j].noteName +
          this.state.songNotes[i][j].time +
          this.state.songNotes[i][j].noteID;
        if (j !== this.state.songNotes[i].length - 1) {
          sequence += " ";
        }
      }

      if (sequence !== 0) {
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

  createEmptyArray(len, itm) {
    var arr1 = [itm],
      arr2 = [];
    while (len > 0) {
      if (len & 1) arr2 = arr2.concat(arr1);
      arr1 = arr1.concat(arr1);
      len >>>= 1;
    }
    return arr2;
  }

  handleLastPassUp = (tNote, noteName, time, remove, noteID) => {
    var temp = this.state.songNotes;
    console.log(tNote, noteName, time, remove);
    if (remove) {
      // temp[tNote] = temp[tNote].splice({ noteName: noteName, time: time }, 1);
      for (var i = 0; i < temp[tNote].length; i++) {
        if (
          temp[tNote][i].noteName === noteName &&
          temp[tNote][i].time === time
        ) {
          temp[tNote].splice(i, 1);
          console.log(temp[tNote]);
        }
      }
    } else {
      temp[tNote] = temp[tNote].concat({
        noteName: noteName,
        time: time,
        noteID: noteID
      });
    }
    var temp2 = this.state.totalNotes;
    temp2[tNote].notes[noteID].selected = true;
    if (this.state.idToPlayUntil === -1) {
      this.setState({ idToPlayUntil: tNote });
    } else {
      if (this.state.idToPlayUntil > tNote) {
        this.setState({ idToPlayUntil: tNote });
      }
    }
    this.setState({ totalNotes: temp2 });
    this.setState({ songNotes: temp });
    this.setState({ isSaved: false });
  };

  //just prints stuff rn, need to figure out how to fix it
  reRenderSong = value => {
    var temp = value.split(",");
    console.log("temp + " + temp[5]);
    for (var i = 3; i < temp.length; i++) {
      console.log("heee");
      var temp2 = temp[i].split(" ");
      var tNoteID = temp2[1];
      for (var j = 2; j < temp2.length; j++) {
        var noteName = temp2[j].charAt(0) + temp2[j].charAt(1);

        var t = temp2[j].charAt(2);
        var t_i = 3;
        if (t === "1") {
          t += temp2[j].charAt(t_i);
          t_i++;
        }
        var id = temp2[j].slice(t_i);
        console.log(tNoteID + " " + noteName + " " + t + " " + id);
        //input the notes
      }
    }
  };

  handleSave = () => {
    var songS = this.handleNoteExport(false);
    fetch("http://localhost:3000/songs", {
      method: "POST",
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
                variant="outline-info"
                onClick={() => {
                  this.handleExport();
                }}
                style={{ marginRight: 10 }}
              >
                Export to PDF
              </Button>

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
