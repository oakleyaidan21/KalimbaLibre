//contains TotalNote objects that span over all of the tines
import React, { Component } from "react";
import TotalNote from "./TotalNote";
import { delay } from "q";

class NoteContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalNotes: [],
      idToPlayUntil: -1
    };

    this.goThroughEachTotalNote = this.goThroughEachTotalNote.bind(this);
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

  //goes through each totalNote and highlights them
  goThroughEachTotalNote = async () => {
    console.log(this.props.tempo);
    console.log(this.props.kalimba);
    var smallestTimeInterval = 4;
    var temp = this.state.totalNotes;
    var counter = 1;
    for (var i = temp.length - 1; i >= this.state.idToPlayUntil; i--) {
      if (i === -1) {
        break;
      }
      if (smallestTimeInterval < 0) {
        smallestTimeInterval = 4;
      }
      var d = (4 * (1000 / (this.props.tempo / 60))) / smallestTimeInterval;
      console.log(d);
      await delay(d);
      if (i !== this.props.amountOfTNotes - 1) {
        temp[i + 1].color = "transparent";
      }
      if (i === 0) {
        break;
      }

      temp[i].color = "rgb(247,255,0,0.5)";
      this.setState({ totalNotes: temp });
      for (var j = 0; j < temp[i].coloredNotes.length; j++) {
        this.props.kalimba.play(temp[i].coloredNotes[j].noteName);
      }
      smallestTimeInterval = this.getSmallestTimeInterval(temp[i].coloredNotes);
      console.log(document.getElementById("tine").clientHeight);
      document.getElementById("holder").scrollTop =
        this.props.amountOfTNotes * 40 - 250 - 40 * counter;
      counter++;
    }
    if (this.state.idToPlayUntil !== -1) {
      temp[this.state.idToPlayUntil].color = "transparent";
      this.setState({ totalNotes: temp });
    } else {
      temp[0].color = "transparent";
      this.setState({ totalNotes: temp });
    }
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
    var temp = this.state.totalNotes;
    if (remove) {
      temp[tNote].coloredNotes.splice(
        temp[tNote].coloredNotes.indexOf({ noteName, time }),
        1
      );
      if (this.state.idToPlayUntil === tNote) {
        var t = this.state.idToPlayUntil - 1;
        this.setState({ idToPlayUntil: t });
      }
    } else {
      if (tNote < this.state.idToPlayUntil || this.state.idToPlayUntil === -1) {
        this.setState({ idToPlayUntil: tNote });
      }

      // this.setState({ idToPlayUntil: tNote });
      temp[tNote].coloredNotes.push({ noteName, time });
      this.setState({ totalNotes: temp });
    }
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
        <>
          {this.state.totalNotes.map(totalNote => (
            <TotalNote
              key={totalNote.key}
              time={totalNote.time}
              rest={totalNote.rest}
              color={totalNote.color}
              is4={totalNote.is4}
              onPassingUpNote={this.handlePassingUpNote}
              id={totalNote.id}
              tineNotes={this.props.tineNotes}
              instrument={this.props.kalimba}
              curTime={this.props.curTime}
              ref="tNoteChild"
            />
          ))}
        </>
      </div>
    );
  }
}

export default NoteContainer;
