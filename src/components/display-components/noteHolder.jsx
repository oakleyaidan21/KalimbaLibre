import React, { Component } from "react";
import TotalNote from "./totalNote";
import { delay } from "q";

class noteHolder extends Component {
  state = {
    totalNotes: [],
    amountOfTNotes: 16
  };

  goThroughEach = async () => {
    for (var i = this.state.amountOfTNotes - 1; i >= 0; i--) {
      var temp = this.state.totalNotes;
      if (i !== this.state.amountOfTNotes - 1) {
        temp[i + 1].color = "transparent";
      }
      console.log("color 1: " + this.state.totalNotes[i].color);
      await delay(500);
      temp[i].color = "rgb(247,255,0,0.5)";
      this.setState({ totalNotes: temp });
    }
  };

  componentDidMount = async () => {
    var temp = [];
    for (var i = 0; i < this.state.amountOfTNotes; i++) {
      var four = false;
      if (i % 4 === 0) {
        four = true;
      }
      temp = temp.concat({
        id: i,
        note: "A3",
        value: 0,
        color: "transparent",
        is4: four
      });
    }
    this.setState({ totalNotes: temp });
  };

  handlePassingUpNote = (passID, passName, color) => {
    this.props.onHolderPassUp(passID, passName, color);
  };

  render() {
    return (
      <div
        id="noteHolder"
        style={{
          position: "absolute",
          zIndex: "10",
          bottom: 0,
          float: "left",
          overflow: "auto"
        }}
      >
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
          />
        ))}
      </div>
    );
  }
}

export default noteHolder;
