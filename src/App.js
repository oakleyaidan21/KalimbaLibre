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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrument: null,
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
      kalimbaLength: 40,
      kalimba: null,
      playing: false,
      tempo: 120,
      songTitle: "No Title",
      keySig: "C",
      time: "4/4",
      curTime: 4,
      songNotes: [[]]
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.changeNoteTime = this.changeNoteTime.bind(this);
    this.handleExport = this.handleExport.bind(this);
  }

  changeNoteTime = childData => {
    console.log(childData);
    if (childData === ".") {
      var t = this.state.curTime;
      var addition = (t + t / 2) / 2;
      console.log(addition);
      this.setState({ curTime: addition });
    } else {
      this.setState({ curTime: childData });
    }
    console.log(this.state.curTime);
  };

  componentDidMount = async () => {
    await delay(500);
    const { instruments } = await getInstruments(["kalimba"]);
    this.setState({ kalimba: instruments.get("kalimba") });
    console.log("kalimba loaded");
    var temp = this.createEmptyArray(this.state.kalimbaLength, [
      { noteName: "A3", time: 4 }
    ]);
    this.setState({ songNotes: temp });
  };

  //can probably handle the page issue by having it image the holder, then manually scroll up and do it again
  handleExport = () => {
    /** oc = new jsPdf();
        ...
        pageHeight= doc.internal.pageSize.height;

        // Before adding new content
        y = 500 // Height position of new content
        if (y >= pageHeight)
        {
          doc.addPage();
          y = 0 // Restart height position
        }
        doc.text(x, y, "value");*/
    var input = document.getElementById("holder");
    html2canvas(input).then(canvas => {
      let pdf = new jsPDF("p", "mm", "a4");
      // var hold = document.getElementById("holder");
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
      // hold.style.overflow = "auto";

      pdf.save("kalimba.pdf");
    });
    input.scrollTop = input.scrollHeight;
  };

  handlePlay = async () => {
    this.refs.child.handleTopLevelPlay();
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
  };

  handleNoteExport = () => {
    const element = document.createElement("a");
    var temp =
      this.state.songTitle +
      "\n" +
      this.state.keySig +
      "\n" +
      this.state.tempo +
      "\n" +
      this.state.kalimbaLength +
      "\n";
    var sequence = "";
    for (var i = this.state.songNotes.length - 1; i >= 0; i--) {
      var shortestTime = 0;
      sequence += i + " ";
      for (var j = 1; j < this.state.songNotes[i].length; j++) {
        if (this.state.songNotes[i][j].time >= shortestTime) {
          shortestTime = this.state.songNotes[i][j].time;
        }
        sequence += this.state.songNotes[i][j].noteName + " ";
      }
      if (sequence !== 0) {
        sequence += shortestTime + "\n";
      }
    }
    temp += sequence;
    const file = new Blob([temp], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = this.state.songTitle;
    document.body.appendChild(element);
    element.click();
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

  handleLastPassUp = (tNote, noteName, time, remove) => {
    var temp = this.state.songNotes;
    if (remove) {
      temp[tNote] = temp[tNote].splice({ noteName: noteName, time: time }, 1);
    } else {
      temp[tNote] = temp[tNote].concat({ noteName: noteName, time: time });
    }
    this.setState({ songNotes: temp });
  };

  scrollToBottom = () => {
    console.log("scroll to bottom");
    this.refs.child.handleScrollBottom();
  };

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="localhost:3000">Kalimba Libre</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Form inline>
            <Button
              variant="outline-info"
              onClick={() => {
                this.handleExport();
              }}
              style={{ margin: 10 }}
            >
              EXPORT SONG TO PDF
            </Button>
            <Button variant="outline-info" onClick={this.handlePlay}>
              PLAY
            </Button>
            <Button
              id="my-input"
              variant="outline-info"
              onClick={this.handleNoteExport}
              style={{ margin: 10 }}
            >
              EXPORT SONG TO TXT
            </Button>
            <Button
              onClick={this.scrollToBottom}
              id="my-input"
              variant="outline-info"
            >
              TO BOTTOM
            </Button>
          </Form>
        </Navbar>
        <Selector
          onChangeNoteTime={this.changeNoteTime}
          curNote={this.state.curTime}
        />
        <KalimbaContainer
          onLastPassUp={this.handleLastPassUp}
          amountOfTNotes={this.state.kalimbaLength}
          tineNotes={this.state.tineNotes}
          kalimba={this.state.kalimba}
          tempo={this.state.tempo}
          playing={this.state.playing}
          ref="child"
          curTime={this.state.curTime}
        />
        <ConfigContainer
          title={this.state.songTitle}
          keySig={this.state.keySig}
          time={this.state.time}
          tempo={this.state.tempo}
          onConfigButton={this.configure}
        />
      </div>
    );
  }
}

export default App;
