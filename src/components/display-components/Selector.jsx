//contains buttons for selecting the type of note to input into the kalimba song
import React, { Component } from "react";
import SelectorButton from "./SelectorButton";
import Badge from "react-bootstrap/Badge";
import Quarter from "../../noteImages/quarter_note.png";
import Eighth from "../../noteImages/eighth_note.png";
import Half from "../../noteImages/half_note.png";
import Sixteenth from "../../noteImages/sixteenth_note.png";
import Whole from "../../noteImages/whole_note.png";

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: this.props.curNote,
      imageToRender: Quarter,
      selectors: [
        { label: 1, image: Whole },
        { label: 2, image: Half },
        { label: 4, image: Quarter },
        { label: 8, image: Eighth },
        { label: 16, image: Sixteenth },
        { label: "." }
        // { label: "R" }
      ]
    };
    this.handleSelectionP = this.handleSelectionP.bind(this);
  }

  handleSelectionP = (label, image) => {
    if (label !== ".") {
      this.setState({ currentNote: label, imageToRender: image });
    } else {
      if (typeof this.state.currentNote === "string") {
        if (this.state.currentNote[this.state.currentNote.length - 1] === "+") {
          return;
        }
      }
      var temp = this.state.currentNote;

      temp += " +";
      this.setState({ currentNote: temp });
    }

    this.props.onChangeNoteTime(label);
  };

  displayNote = () => {
    return (
      <img
        src={this.state.imageToRender}
        alt=""
        style={{
          maxWidth: "100%",
          maxHeight: "100%"
        }}
      />
    );
  };

  render() {
    var type = "btn btn-outline-primary btn-sm";
    if (this.props.tieMode) {
      type = "btn btn-warning btn-sm";
    }
    return (
      <div
        id="selector"
        style={{
          width: 75,
          height: 500,
          background: "#D4D4D4",
          borderRadius: 10,
          right: 50,
          top: 75,
          position: "absolute",
          textAlign: "center"
        }}
      >
        {this.state.selectors.map(selectorButton => (
          <SelectorButton
            key={selectorButton.label}
            onSelectNote={this.handleSelectionP}
            label={selectorButton.label}
            image={selectorButton.image}
          />
        ))}
        <button
          style={{ marginTop: 10 }}
          onClick={() => {
            this.props.onTieSelection();
          }}
          className={type}
        >
          tie
        </button>
        <div style={{ fontSize: 30, marginTop: 10 }}>
          <br></br>
          <Badge variant={"primary"} style={{ margin: "0 auto", maxWidth: 40 }}>
            {this.displayNote()}
          </Badge>
        </div>
      </div>
    );
  }
}

export default Selector;
