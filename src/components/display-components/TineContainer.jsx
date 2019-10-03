import React, { Component } from "react";
import Tine from "../music-components/Tine";

class TineContainer extends Component {
  state = {
    tiles: [
      { len: 1, note: "D6", value: 0, color: "rgb(255,255,255" },
      { len: 2, note: "B5", value: 0, color: "rgb(255,255,255" },
      { len: 3, note: "G5", value: 0, color: "rgb(0,123,255" },
      { len: 4, note: "E5", value: 0, color: "rgb(255,255,255" },
      { len: 5, note: "C5", value: 0, color: "rgb(255,255,255" },
      { len: 6, note: "A4", value: 0, color: "rgb(0,123,255" },
      { len: 7, note: "F4", value: 0, color: "rgb(255,255,255" },
      { len: 8, note: "D4", value: 0, color: "rgb(255,255,255" },
      { len: 9, note: "C4", value: 0, color: "rgb(0,123,255" },
      { len: 8, note: "E4", value: 0, color: "rgb(255,255,255" },
      { len: 7, note: "G4", value: 0, color: "rgb(255,255,255" },
      { len: 6, note: "B4", value: 0, color: "rgb(0,123,255" },
      { len: 5, note: "D5", value: 0, color: "rgb(255,255,255" },
      { len: 4, note: "F5", value: 0, color: "rgb(255,255,255" },
      { len: 3, note: "A5", value: 0, color: "rgb(0,123,255" },
      { len: 2, note: "C6", value: 0, color: "rgb(255,255,255" },
      { len: 1, note: "E6", value: 0, color: "rgb(255,255,255" }
    ],
    tines: this.props.tineNotes,
    amountOfTNotes: this.props.amountOfTNotes
  };
  render() {
    return (
      <div
        id="tineHolder"
        style={{
          width: 550,
          height: 600,
          position: "absolute",
          zIndex: 5,
          bottom: 0
        }}
      >
        {this.state.tiles.map(tine => (
          <Tine
            key={tine.note}
            note={tine.note}
            color={tine.color}
            len={tine.len}
            isConfig={this.state.isConfig}
            amountOfTNotes={this.state.amountOfTNotes}
          />
        ))}
      </div>
    );
  }
}

export default TineContainer;
