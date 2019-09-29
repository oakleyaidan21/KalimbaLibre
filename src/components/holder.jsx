import React, { Component } from "react";
import Tile from "./tiles";
import MIDISounds from "midi-sounds-react";
import Note from "./note";

class Holder extends Component {
  state = {
    tiles: [
      { len: 1, note: "D3", value: 0, color: "rgb(255,255,255" },
      { len: 2, note: "B2", value: 0, color: "rgb(255,255,255" },
      { len: 3, note: "G2", value: 0, color: "rgb(0,123,255" },
      { len: 4, note: "E2", value: 0, color: "rgb(255,255,255" },
      { len: 5, note: "C2", value: 0, color: "rgb(255,255,255" },
      { len: 6, note: "A", value: 0, color: "rgb(0,123,255" },
      { len: 7, note: "F", value: 0, color: "rgb(255,255,255" },
      { len: 8, note: "D", value: 0, color: "rgb(255,255,255" },
      { len: 9, note: "C", value: 0, color: "rgb(0,123,255" },
      { len: 8, note: "E", value: 0, color: "rgb(255,255,255" },
      { len: 7, note: "G", value: 0, color: "rgb(255,255,255" },
      { len: 6, note: "B", value: 0, color: "rgb(0,123,255" },
      { len: 5, note: "D2", value: 0, color: "rgb(255,255,255" },
      { len: 4, note: "F2", value: 0, color: "rgb(255,255,255" },
      { len: 3, note: "A2", value: 0, color: "rgb(0,123,255" },
      { len: 2, note: "C3", value: 0, color: "rgb(255,255,255" },
      { len: 1, note: "E3", value: 0, color: "rgb(255,255,255" }
    ]
  };

  handleTileClick() {
    console.log("hi");
  }

  render() {
    return (
      <div
        style={{
          //38%
          marginLeft: "705px",
          marginTop: "20px",
          width: "510px",
          height: "600px",
          background: "#D4D4D4",
          borderRadius: "25px",
          float: "left",
          cursor: "default"
        }}
      >
        {/* <MIDISounds
          ref={ref => (this.midiSounds = ref)}
          appElementName="root"
          instruments={[3]}
        /> */}
        {this.state.tiles.map(tile => (
          <Tile
            key={tile.note}
            note={tile.note}
            color={tile.color}
            len={tile.len}
          />
        ))}
      </div>
    );
  }
}

export default Holder;
