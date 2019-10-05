//horizontal container of 14 notes that go across the tines
import React, { Component } from "react";
import Note from "../music-components/Note";

class TotalNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundcolor: this.props.color,
      id: this.props.id,
      notes: [
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[0].note,
          color: "transparent",
          selected: false,
          noteID: 0
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[1].note,
          color: "transparent",
          selected: false,
          noteID: 1
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[2].note,
          color: "transparent",
          selected: false,
          noteID: 2
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[3].note,
          color: "transparent",
          selected: false,
          noteID: 3
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[4].note,
          color: "transparent",
          selected: false,
          noteID: 4
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[5].note,
          color: "transparent",
          selected: false,
          noteID: 5
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[6].note,
          color: "transparent",
          selected: false,
          noteID: 6
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[7].note,
          color: "transparent",
          selected: false,
          noteID: 7
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[8].note,
          color: "transparent",
          selected: false,
          noteID: 8
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[9].note,
          color: "transparent",
          selected: false,
          noteID: 9
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[10].note,
          color: "transparent",
          selected: false,
          noteID: 10
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[11].note,
          color: "transparent",
          selected: false,
          noteID: 11
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[12].note,
          color: "transparent",
          selected: false,
          noteID: 12
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[13].note,
          color: "transparent",
          selected: false,
          noteID: 13
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[14].note,
          color: "transparent",
          selected: false,
          noteID: 14
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[15].note,
          color: "transparent",
          selected: false,
          noteID: 15
        },
        {
          time: this.props.curTime,
          rest: false,
          name: this.props.tineNotes[16].note,
          color: "transparent",
          selected: false,
          noteID: 16
        }
      ]
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
    var temp = this.state.notes;
    for (var i = 0; i < temp[i].length; i++) {
      temp.notes[i].time = nextProps.curTime;
    }
    this.setState({ notes: temp });
  };

  handleNoteClick = (passID, tnID, notename, time, remove) => {
    var temp = this.state.notes;
    if (remove) {
      temp[passID].color = "transparent";
      temp[passID].selected = false;
      this.setState({ notes: temp });
      this.props.onPassingUpNote(tnID, notename, time, remove);
    } else {
      temp[passID].color = "purple";
      temp[passID].selected = true;
      this.setState({ notes: temp });
      this.props.onPassingUpNote(tnID, notename, time, remove);
    }
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
        {this.state.notes.map(note => (
          <Note
            time={this.props.curTime}
            rest={note.rest}
            name={note.name}
            color={note.color}
            id={this.state.id}
            onSelectNote={this.handleSelection}
            onHandleNoteClick={this.handleNoteClick}
            noteID={note.noteID}
            instrument={this.props.instrument}
          />
        ))}
      </div>
    );
  }
}

export default TotalNote;
