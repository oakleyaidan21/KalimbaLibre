//emulate the tiles on a kalimba. Contain an indefinite amount of note objects vertically

import React, { Component } from "react";

class Tine extends Component {
  state = {
    note: this.props.note,
    color: this.props.color,
    len: this.props.len * 20 + this.props.amountOfTNotes * 40,
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
      { id: 12, time: 4, rest: false, name: "C" },
      { id: 13, time: 4, rest: false, name: "C" },
      { id: 14, time: 4, rest: false, name: "C" },
      { id: 15, time: 4, rest: false, name: "C" },
      { id: 16, time: 4, rest: false, name: "C" },
      { id: 17, time: 4, rest: false, name: "C" },
      { id: 18, time: 4, rest: false, name: "C" }
    ]
  };
  handleClick = () => {
    console.log("tile " + this.state.note);
    var newNote = "";
    while (newNote === "") {
      newNote = prompt("Please enter a new note");
    }

    this.setState({ note: newNote });
  };

  printNote = () => {
    return this.state.note;
  };

  render() {
    return (
      <div id="tine">
        <button
          style={{
            float: "left",
            background: this.props.color + ")",
            width: "28px",
            height: this.state.len,
            border: "3px solid black",
            margin: "2px",
            borderRadius: "25px"
          }}
          onClick={this.handleClick.bind(this)}
        >
          <b
            style={{
              top: this.state.len - 1300,
              position: "relative",
              fontSize: 10,
              marginRight: 5
            }}
          >
            {this.state.note}
          </b>
        </button>
      </div>
    );
  }
}

export default Tine;
