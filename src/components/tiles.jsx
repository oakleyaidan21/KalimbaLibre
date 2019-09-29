//emulate the tiles on a kalimba. Contain an indefinite amount of note objects vertically

import React, { Component } from "react";
import MIDISounds from "midi-sounds-react";
import Note from "./note";

class Tile extends Component {
  state = {
    note: this.props.note,
    color: this.props.color,
    len: this.props.len * 3 + 500,
    value: 1,
    buttons: [
      { id: 1, time: 4, rest: false, name: "C" },
      { id: 2, time: 4, rest: false, name: "C" },
      { id: 3, time: 4, rest: false, name: "C" },
      { id: 4, time: 4, rest: false, name: "C" },
      { id: 5, time: 4, rest: false, name: "C" },
      { id: 6, time: 4, rest: false, name: "C" },
      { id: 7, time: 4, rest: false, name: "C" },
      { id: 8, time: 4, rest: false, name: "C" },
      { id: 9, time: 4, rest: false, name: "C" },
      { id: 10, time: 4, rest: false, name: "C" },
      { id: 11, time: 4, rest: false, name: "C" },
      { id: 12, time: 4, rest: false, name: "C" }
    ]
  };
  handleClick = () => {
    console.log(this.state.note);
    // this.midiSounds.playChordNow(3, [40], 2.5);
  };

  printNote = () => {
    return this.state.note;
  };

  render() {
    var templen = this.props.len + "550";
    return (
      <div>
        <button
          style={{
            float: "left",
            position: "relative",
            background: this.props.color + ")",
            width: "28px",
            height: 500 + this.props.len * 10,
            border: "3px solid black",
            padding: "1px",
            margin: "1px",
            borderRadius: "25px"
          }}
          onClick={this.handleClick.bind(this)}
        ></button>
        {/* {this.state.buttons.map(note => (
          <Note
            key={note.id}
            time={note.time}
            rest={note.rest}
            name={this.state.note}
            color={this.state.color}
          />
        ))} */}
        {/* <MIDISounds
          ref={ref => (this.midiSounds = ref)}
          appElementName="root"
          instruments={[3]}
        /> */}
      </div>
    );
  }
}

export default Tile;
