//contains TotalNote objects that span over all of the tines
import React, { Component } from "react";
import TotalNote from "./TotalNote";

class NoteContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idToPlayUntil: -1
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

  handlePassingUpNote = (tNote, noteName, time, remove, noteID) => {
    this.props.onHolderPassUp(tNote, noteName, time, remove, noteID);
  };

  handlePassUpTick = id => {
    this.props.onTickPassUp(id);
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
        {this.props.totalNotes.map(totalNote => (
          <TotalNote
            key={totalNote.key}
            time={totalNote.time}
            rest={totalNote.rest}
            color={totalNote.color}
            onPassingUpNote={this.handlePassingUpNote}
            selected={totalNote.selected}
            id={totalNote.id}
            tineNotes={this.props.tineNotes}
            instrument={this.props.kalimba}
            curTime={this.props.curTime}
            notes={totalNote.notes}
            imageToRender={this.props.imageToRender}
            amountOfTNotes={this.props.totalNotes.length}
            passUpTick={this.props.onTickPassUp}
            passUpMinus={this.props.onMinusPassUp}
          />
        ))}
      </div>
    );
  }
}

export default NoteContainer;
