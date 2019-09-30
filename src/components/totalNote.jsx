import React, { Component } from "react";
import Note from "./note";

class TotalNote extends Component {
  state = {
    notes: [
      { time: 4, rest: false, name: "D3", color: "transparent" },
      { time: 4, rest: false, name: "B2", color: "transparent" },
      { time: 4, rest: false, name: "G2", color: "transparent" },
      { time: 4, rest: false, name: "E2", color: "transparent" },
      { time: 4, rest: false, name: "C2", color: "transparent" },
      { time: 4, rest: false, name: "A", color: "transparent" },
      { time: 4, rest: false, name: "F", color: "transparent" },
      { time: 4, rest: false, name: "D", color: "transparent" },
      { time: 4, rest: false, name: "C", color: "transparent" },
      { time: 4, rest: false, name: "E", color: "transparent" },
      { time: 4, rest: false, name: "G", color: "transparent" },
      { time: 4, rest: false, name: "B", color: "transparent" },
      { time: 4, rest: false, name: "D2", color: "transparent" },
      { time: 4, rest: false, name: "F2", color: "transparent" },
      { time: 4, rest: false, name: "A2", color: "transparent" },
      { time: 4, rest: false, name: "C3", color: "transparent" },
      { time: 4, rest: false, name: "E3", color: "transparent" }
    ],
    backgroundcolor: "transparent"
  };

  handleSelection = childData => {
    this.setState({ backgroundcolor: childData });
  };

  render() {
    return (
      <div
        style={{
          width: 550,
          height: 40,
          background: this.state.backgroundcolor,
          borderBottom: "2px solid black",
        }}
      >
        {this.state.notes.map(note => (
          <Note
            key={note.name}
            time={note.time}
            rest={note.rest}
            name={note.name}
            color={note.color}
            onSelectNote={this.handleSelection}
          />
        ))}
      </div>
    );
  }
}

export default TotalNote;
