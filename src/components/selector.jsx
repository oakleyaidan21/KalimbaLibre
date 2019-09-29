import React, { Component } from "react";
import SelectorButton from "./selectorButton";
import Badge from "react-bootstrap/Badge";

class Selector extends Component {
  state = {
    currentNote: "None Selected",
    selectors: [
      { label: "4" },
      { label: "8" },
      { label: "16" },
      { label: "32" }
    ]
  };

  handleSelectionP = childData => {
    this.setState({ currentNote: childData });
  };

  render() {
    return (
      <div
        style={{
          width: "400px",
          height: "200px",
          background: "#D4D4D4",
          borderRadius: "25px",
          float: "left",
          marginLeft: "50px",
          marginTop: "20px"
        }}
      >
        {this.state.selectors.map(selectorButton => (
          <SelectorButton
            onSelectNote={this.handleSelectionP}
            label={selectorButton.label}
          />
        ))}
        {/* <p style={{ textAlign: "center" }} className="primary">
          Current Note: {this.state.currentNote}
        </p> */}
        <Badge variant="secondary" style={{ position: "center" }}>
          Current Note: {this.state.currentNote}
        </Badge>
      </div>
    );
  }
}

export default Selector;
