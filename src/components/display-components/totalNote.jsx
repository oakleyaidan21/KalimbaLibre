import React, { Component } from "react";
import Note from "../music-components/Note";

class TotalNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundcolor: this.props.color,
      is4: this.props.is4,
      id: this.props.id,
      notes: this.props.notes
    };
  }

  handleSelection = childData => {
    this.setState({ backgroundcolor: childData });
  };

  handleNoteClick = (passID, tnID) => {
    console.log("clicked! " + passID);
    console.log(this.state.notes[passID].color);
    // var temp = this.state.notes;
    // temp[passID].color = color;
    // this.setState({ notes: temp });
    // s
  };

  render() {
    var border = "transparent";
    if (this.state.is4) {
      border = "black";
    }
    return (
      <div
        id="totalNote"
        style={{
          width: 550,
          height: 40,
          background: this.props.color,
          borderBottom: "2px solid " + border
        }}
      >
        {this.state.notes.map(note => (
          <Note
            time={note.time}
            rest={note.rest}
            name={note.name}
            color={note.color}
            id={this.state.id}
            onSelectNote={this.handleSelection}
            onHandleNoteClick={this.handleNoteClick}
            noteID={note.noteID}
          />
        ))}
      </div>
    );
  }
}

export default TotalNote;
