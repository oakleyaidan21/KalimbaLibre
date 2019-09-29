import React, { Component } from "react";
import TotalNote from "./totalNote";

class noteHolder extends Component {
  state = {
    totalNotes: [
      { note: "D3", value: 0, color: "rgb(255,255,255" },
      { note: "B2", value: 0, color: "rgb(255,255,255" },
      { note: "G2", value: 0, color: "rgb(0,123,255" },
      { note: "E2", value: 0, color: "rgb(255,255,255" },
      { note: "C2", value: 0, color: "rgb(255,255,255" },
      { note: "A", value: 0, color: "rgb(0,123,255" },
      { note: "F", value: 0, color: "rgb(255,255,255" },
      { note: "D", value: 0, color: "rgb(255,255,255" },
      { note: "C", value: 0, color: "rgb(0,123,255" },
      { note: "E", value: 0, color: "rgb(255,255,255" },
      { note: "G", value: 0, color: "rgb(255,255,255" },
      { note: "B", value: 0, color: "rgb(0,123,255" }
    ]
  };
  render() {
    return (
      <div style={{ position: "absolute", marginLeft: 705 }}>
        {this.state.totalNotes.map(totalNote => (
          <TotalNote
            key={totalNote.id}
            time={totalNote.time}
            rest={totalNote.rest}
            name={this.state.note}
            color={this.state.color}
            style={{
              marginBottom: "100px"
            }}
          />
        ))}
      </div>
    );
  }
}

export default noteHolder;
