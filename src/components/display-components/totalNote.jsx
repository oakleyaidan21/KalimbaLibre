import React, { Component } from "react";
import Note from "../music-components/Note";

class TotalNote extends Component {
  state = {
    backgroundcolor: this.props.color,
    is4: this.props.is4,
    id: this.props.id,
    notes: this.props.notes,
    measure: this.props.measure,
    isPlaying: this.props.isPlaying,
    playingID: this.props.playingID
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.color !== this.props.color) {
      this.setState({ backgroundcolor: this.props.color });
    }
  }

  handleSelection = childData => {
    this.setState({ backgroundcolor: childData });
  };

  handleNoteClick = (passID, passName, color) => {
    console.log("total note: " + color);
    this.props.onPassingUpNote(passID, passName, color);
  };

  render() {
    var border = "transparent";
    var background = "transparent";
    if (this.state.isPlaying && this.state.id === this.state.playingID) {
      background = "black";
    }
    if (this.state.is4) {
      border = "black";
    }
    return (
      <div
        id="totalNote"
        style={{
          width: 550,
          height: 40,
          background: background,
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
