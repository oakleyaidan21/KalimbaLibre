//contains TotalNote objects that span over all of the tines
import React, { Component } from "react";
import TotalNote from "./TotalNote";

class NoteContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idToPlayUntil: -1,
      tNoteRefs: []
    };
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  getSmallestTimeInterval = array => {
    return Math.max.apply(
      Math,
      array.map(function(o) {
        return o.time;
      })
    );
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ curTime: nextProps.curTime });
  };

  //populates the totalNotes Array
  componentDidMount = () => {
    var temp = [];
    for (var i = 0; i < this.props.amountOfTNotes; i++) {
      var four = false;
      if (i % 4 === 0 || i === this.state.propsNotes - 1) {
        four = true;
      }
      temp.push({
        key: i,
        time: 4,
        rest: false,
        color: "transparent",
        is4: four,
        onPassingUpNote: this.handlePassingUpNote,
        id: i,
        coloredNotes: []
      });
    }
    this.setState({ totalNotes: temp });
  };

  handlePassingUpNote = (tNote, noteName, time, remove, noteID) => {
    this.props.onHolderPassUp(tNote, noteName, time, remove, noteID);
  };

  render() {
    return (
      <div
        id="noteHolder"
        style={{
          position: "absolute",
          zIndex: "10",
          top: 0,
          float: "left"
        }}
      >
        {this.props.totalNotes.map((totalNote, index) => (
          <TotalNote
            key={totalNote.key}
            time={totalNote.time}
            rest={totalNote.rest}
            color={totalNote.color}
            onPassingUpNote={this.handlePassingUpNote}
            id={totalNote.id}
            tineNotes={this.props.tineNotes}
            instrument={this.props.kalimba}
            curTime={this.props.curTime}
            notes={totalNote.notes}
          />
        ))}
      </div>
    );
  }
}

export default NoteContainer;
