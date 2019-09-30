import React, { Component } from "react";
import SelectorButton from "./selectorButton";
import Badge from "react-bootstrap/Badge";

class Selector extends Component {
  state = {
    currentNote: "N",
    selectors: [
      { label: "1"},
      { label: "2"},
      { label: "4" },
      { label: "8" },
      { label: "16" },
      { label: "32" }
    ]
  };

  handleSelectionP = childData => {
    this.setState({ currentNote: childData });
  };

  getBadgeClass() {
    return this.state.currentNote === "N" ? "warning" : "primary";
  }

  displayNote() {
    var n = this.state.currentNote;
    return this.state.currentNote === "N" ? "___" : n;
  }

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
