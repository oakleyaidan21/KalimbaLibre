//contains buttons for selecting the type of note to input into the kalimba song
import React, { Component } from "react";
import SelectorButton from "./SelectorButton";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: this.props.curNote,
      selectors: [
        { label: 1 },
        { label: 2 },
        { label: 4 },
        { label: 8 },
        { label: 16 },
        { label: 32 },
        { label: "." },
        { label: "R" }
      ]
    };
    this.handleSelectionP = this.handleSelectionP.bind(this);
  }

  handleSelectionP = childData => {
    if (childData !== ".") {
      this.setState({ currentNote: childData });
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

    this.props.onChangeNoteTime(childData);
  };

  getBadgeClass = () => {
    return "primary";
  };

  displayNote = () => {
    return this.state.currentNote;
  };

  render() {
    var type = "primary";
    if (this.props.tieMode) {
      type = "warning";
    }
    return (
      <div
        id="selector"
        style={{
          width: 75,
          height: 580,
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
          />
        ))}
        <Button
          style={{ marginTop: 10 }}
          onClick={() => {
            this.props.onTieSelection();
          }}
          variant={type}
        >
          tie
        </Button>
        <div style={{ fontSize: 30, marginTop: 10 }}>
          <br></br>
          <Badge
            variant={this.getBadgeClass()}
            size="lg"
            style={{ margin: "0 auto" }}
          >
            {this.displayNote()}
          </Badge>
        </div>
      </div>
    );
  }
}

export default Selector;
