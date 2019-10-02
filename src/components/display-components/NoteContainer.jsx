import React, { Component } from "react";
import TotalNote from "./TotalNote";
import { delay } from "q";

class NoteContainer extends Component {
  state = {
    totalNotes: [],
    amountOfTNotes: this.props.amountOfTNotes,
    isPlaying: this.props.isPlaying,
    playingID: this.props.playingID
  };

  goThroughEachTotalNote = async () => {
    var temp = this.state.totalNotes;
    for (var i = this.state.amountOfTNotes - 1; i >= 0; i--) {
      if (i !== this.state.amountOfTNotes - 1) {
        temp[i + 1].color = "transparent";
      }
      console.log(temp[i]);
      await delay(500);
      temp[i].color = "rgb(247,255,0,0.5)";
      this.setState({ totalNotes: temp });
    }
    temp[0].color = "transparent";
    this.setState({ totalNotes: temp });
  };

  componentWillMount = async () => {
    var temp = [];
    for (var i = 0; i < this.state.amountOfTNotes; i++) {
      var four = false;
      var m = null;
      if (i % 4 === 0 || i === this.state.amountOfTNotes - 1) {
        four = true;
        m = i / 4;
      }
      temp = temp.concat({
        id: i,
        note: "A3",
        value: 0,
        color: "transparent",
        is4: four,
        measure: m,
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
        ]
      });
    }
    this.setState({ totalNotes: temp });
  };

  testGoThrough = async () => {
    this.goThroughEachTotalNote();
  };

  handlePassingUpNote = (passID, passName, color) => {
    var temp = this.state.totalNotes;
    temp[passID].color = color;
    this.setState({ totalNotes: temp });
    this.props.onHolderPassUp(passID, passName, color);
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
        {" "}
        <button onClick={this.testGoThrough}>test</button>
        {this.state.totalNotes.map(totalNote => (
          <TotalNote
            key={totalNote.id}
            time={totalNote.time}
            rest={totalNote.rest}
            name={this.state.note}
            color={totalNote.color}
            is4={totalNote.is4}
            onPassingUpNote={this.handlePassingUpNote}
            id={totalNote.id}
            notes={totalNote.notes}
            measure={totalNote.measure}
            isPlaying={this.state.isPlaying}
            playingID={this.state.playingID}
          />
        ))}
      </div>
    );
  }
}

export default NoteContainer;
