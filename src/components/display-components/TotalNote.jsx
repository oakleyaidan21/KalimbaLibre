//horizontal container of 14 notes that go across the tines
import React, { Component } from "react";
import Note from "../music-components/Note";

class TotalNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundcolor: this.props.color,
      id: this.props.id
    };
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  handleSelection = childData => {
    this.setState({ backgroundcolor: childData });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ backgroundcolor: nextProps.color });
    // var temp = this.state.notes;
    // for (var i = 0; i < temp[i].length; i++) {
    //   temp.notes[i].time = nextProps.curTime;
    // }
    // this.setState({ notes: temp });
  };

  handleNoteClick = (passID, tnID, notename, time, remove) => {
    var temp = this.props.notes;
    if (remove) {
      temp[passID].color = "transparent";
      temp[passID].selected = false;
      // this.setState({ notes: temp });
      this.props.onPassingUpNote(tnID, notename, time, remove, passID);
    } else {
      temp[passID].color = "purple";
      temp[passID].selected = true;
      // this.setState({ notes: temp });
      this.props.onPassingUpNote(tnID, notename, time, remove, passID);
    }
  };

  lastPassDown = (tNoteID, noteName, t, id) => {
    this.props.children[id].handleNoteClick(tNoteID, noteName, t, id, true);
  };

  render() {
    return (
      <div
        id="totalNote"
        style={{
          width: 550,
          height: 40,
          background: this.state.backgroundcolor,
          borderBottom: "2px solid transparent"
        }}
      >
        {this.props.notes.map((note, index) => (
          <Note
            time={this.props.curTime}
            rest={note.rest}
            name={this.props.tineNotes[index].note}
            color={note.color}
            id={this.state.id}
            selected={note.selected}
            onSelectNote={this.handleSelection}
            onHandleNoteClick={this.handleNoteClick}
            noteID={note.noteID}
            instrument={this.props.instrument}
            imageToRender={note.imageToRender}
          />
        ))}
      </div>
    );
  }
}

export default TotalNote;
