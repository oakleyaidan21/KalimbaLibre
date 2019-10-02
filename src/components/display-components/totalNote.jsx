import React, { Component } from "react";
import Note from "../music-components/note";

class TotalNote extends Component {
  state = {
    notes: [
      {
        time: 4,
        rest: false,
        name: "D6",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "B5",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "G5",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "E5",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "C5",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "A4",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "F4",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "D4",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "C4",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "E4",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "G4",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "B4",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "D5",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "F5",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "A5",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "C6",
        color: "transparent",
        selected: false
      },
      {
        time: 4,
        rest: false,
        name: "E6",
        color: "transparent",
        selected: false
      }
    ],
    backgroundcolor: "transparent",
    is4: this.props.is4,
    id: this.props.id
  };

  handleSelection = childData => {
    this.setState({ backgroundcolor: childData });
  };

  handleNoteClick = (passID, passName, color) => {
    this.props.onPassingUpNote(passID, passName, color);
  };

  render() {
    var border = "transparent";
    if (this.state.is4) {
      border = "black";
    }
    return (
      <div
        style={{
          width: 550,
          height: 40,
          background: this.state.backgroundcolor,
          borderBottom: "2px solid " + border
        }}
      >
        {this.state.notes.map(note => (
          <Note
            key={note.name}
            time={note.time}
            rest={note.rest}
            name={note.name}
            color={note.color}
            id={this.state.id}
            onSelectNote={this.handleSelection}
            onHandleNoteClick={this.handleNoteClick}
          />
        ))}
      </div>
    );
  }
}

export default TotalNote;
