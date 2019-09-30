import React, { Component } from 'react';
import Tile from "./tiles";

class TileHolder extends Component {
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
          ]
     }
    render() {
        return (
            <div style={{
                width: "550px",
                height: "600px",
                position: "absolute",
                zIndex: "5"
            }}>{this.state.tiles.map(tile => (
                <Tile
                  key={tile.note}
                  note={tile.note}
                  color={tile.color}
                  len={tile.len}
                />
              ))}</div>
        );
    }
}

export default TileHolder;