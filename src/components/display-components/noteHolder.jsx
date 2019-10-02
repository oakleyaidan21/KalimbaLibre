import React, { Component } from "react";
import TotalNote from "./totalNote";

class noteHolder extends Component {
  state = {
    totalNotes: []
  };

  componentDidMount() {
    var temp = [];
    for (var i = 0; i < 16; i++) {
      var four = false;
      if (i % 4 === 0) {
        four = true;
      }
      temp = temp.concat({
        id: i,
        note: "A3",
        value: 0,
        color: "rgb(255,255,255)",
        is4: four
      });
    }
    this.setState({ totalNotes: temp });
  }

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
            color={this.state.color}
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
