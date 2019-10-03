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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: [],
      instrument: null,
      playingNotes: null,
      renderAbcjs: false,
      abcjsSong: "",
      tineNotes: [
        { len: 1, note: "D6", value: 0, color: "rgb(255,255,255" },
        { len: 2, note: "B5", value: 0, color: "rgb(255,255,255" },
        { len: 3, note: "G5", value: 0, color: "rgb(0,123,255" },
        { len: 4, note: "E5", value: 0, color: "rgb(255,255,255" },
        { len: 5, note: "C5", value: 0, color: "rgb(255,255,255" },
        { len: 6, note: "A4", value: 0, color: "rgb(0,123,255" },
        { len: 7, note: "Beep4", value: 0, color: "rgb(255,255,255" },
        { len: 8, note: "D4", value: 0, color: "rgb(255,255,255" },
        { len: 9, note: "C4", value: 0, color: "rgb(0,123,255" },
        { len: 8, note: "E4", value: 0, color: "rgb(255,255,255" },
        { len: 7, note: "G4", value: 0, color: "rgb(255,255,255" },
        { len: 6, note: "B4", value: 0, color: "rgb(0,123,255" },
        { len: 5, note: "D5", value: 0, color: "rgb(255,255,255" },
        { len: 4, note: "F5", value: 0, color: "rgb(255,255,255" },
        { len: 3, note: "A5", value: 0, color: "rgb(0,123,255" },
        { len: 2, note: "C6", value: 0, color: "rgb(255,255,255" },
        { len: 1, note: "E6", value: 0, color: "rgb(255,255,255" }
      ]
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

  //can probably handle the page issue by having it image the holder, then manually scroll up and do it again
  handleExport = () => {
    var input = document.getElementById("holder");
    var tine = document.getElementById("tine");
    var HTML_Width = input.clientWidth;
    var HTML_Height = tine.clientHeight;
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + top_left_margin * 2;
    var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas(input, { allowTaint: true }).then(function(canvas) {
      canvas.getContext("2d");
      console.log(canvas.height + " " + canvas.width);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
      pdf.addImage(
        imgData,
        "JPG",
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height
      );

      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(
          imgData,
          "JPG",
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }
      pdf.save("kalimba-tabs.pdf");
    });
  };

  handlePlay = async () => {
    if (this.state.song.length !== 0) {
      const { instruments, playingNotes } = await getInstruments(["kalimba"]);
      const kalimba = instruments.get("kalimba");
      var songArray = this.convertSong();
      console.log(songArray);

      for (var i = songArray.length - 1; i >= 0; i--) {
        await delay(200);
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
      var index = this.state.song.findIndex(
        element => element.passID === passID && element.passName === passName
      );
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
          </Nav>
          <Form inline>
            <Button
              variant="outline-info"
              onClick={this.handleExport}
              style={{ marginRight: 10 }}
            >
              EXPORT
            </Button>
            <Button variant="outline-info" onClick={this.handlePlay}>
              PLAY
            </Button>
          </Form>
        </Navbar>
        <Selector style={{ topMargin: "0px" }} />
        <KalimbaContainer
          onLastPassUp={this.handleLastPassUp}
          amountOfTNotes={40}
          tineNotes={this.tineNotes}
        />
        <ConfigContainer />
      </div>
    );
  }
}

export default App;
