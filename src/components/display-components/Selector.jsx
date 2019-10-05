//contains buttons for selecting the type of note to input into the kalimba song
import React, { Component } from "react";
import SelectorButton from "./SelectorButton";
import Badge from "react-bootstrap/Badge";

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
        { label: "." }
      ]
    };
    this.handleSelectionP = this.handleSelectionP.bind(this);
  }

  handleSelectionP = childData => {
    if (childData !== ".") {
      this.setState({ currentNote: childData });
    }
    this.props.onChangeNoteTime(childData);
  };

  handlePlay() {
    console.log("play pressed");
  }

  getBadgeClass = () => {
    return "primary";
  };

  displayNote = () => {
    // var n = this.state.currentNote;
    return this.state.currentNote;
  };

  render() {
    return (
      <div
        style={{
          width: "400px",
          height: "200px",
          background: "#D4D4D4",
          borderRadius: "25px",
          right: 20,
          top: 60,
          position: "absolute"
        }}
      >
        {this.state.selectors.map(selectorButton => (
          <SelectorButton
            key={selectorButton.label}
            onSelectNote={this.handleSelectionP}
            label={selectorButton.label}
          />
        ))}
        <Badge variant="secondary" style={{ marginLeft: 155, marginTop: 80 }}>
          Current Note
        </Badge>
        <br></br>
        <Badge variant={this.getBadgeClass()} style={{ marginLeft: 185 }}>
          {this.displayNote()}
        </Badge>
      </div>
    );
  }
}

export default Selector;
