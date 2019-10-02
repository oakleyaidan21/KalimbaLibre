import React, { Component } from "react";
import TotalNote from "./totalNote";
import { delay } from "q";

class noteHolder extends Component {
  state = {
    totalNotes: [],
    amountOfTNotes: this.props.amountOfTNotes
  };

  goThroughEach = async () => {
    for (var i = this.state.amountOfTNotes - 1; i >= 0; i--) {
      var temp = this.state.totalNotes;
      if (i !== this.state.amountOfTNotes - 1) {
        temp[i + 1].color = "transparent";
      }
      await delay(500);
      temp[i].color = "rgb(247,255,0,0.5)";
      this.setState({ totalNotes: temp });

      console.log("selected: " + this.state.totalNotes[i].notes[0].selected);
    }
    temp[0].color = "transparent";
    this.setState({ totalNotes: temp });
  };

  componentWillMount = async () => {
    console.log(this.state.amountOfTNotes);
    var temp = [];
    for (var i = 0; i < this.state.amountOfTNotes; i++) {
      var four = false;
      if (i % 4 === 0 || i === this.state.amountOfTNotes - 1) {
        four = true;
      }
      temp = temp.concat({
        id: i,
        note: "A3",
        value: 0,
        color: "transparent",
        is4: four,
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
    this.goThroughEach();
  };

  handlePassingUpNote = (passID, passName, color) => {
    this.props.onHolderPassUp(passID, passName, color);
  };

  render() {
    console.log(this.state.totalNotes.length);
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
          />
        ))}
      </div>
    );
  }
}

export default noteHolder;
