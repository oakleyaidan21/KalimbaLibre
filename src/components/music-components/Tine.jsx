//emulate the tiles on a kalimba
import React, { Component } from "react";

class Tine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      len: this.props.len * 15 + this.props.amountOfTNotes * 40,
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
  }
  handleClick = () => {
    console.log("tile " + this.state.note);
    var newNote = "";
    while (newNote === "") {
      newNote = prompt("Please enter a new note");
    }
    if (newNote !== null) {
      this.setState({ note: newNote });
    }
  };

  printNote = () => {
    return this.state.note;
  };

  render() {
    return (
      <div id="tine">
        <button
          style={{
            paddingTop: this.state.len,
            float: "left",
            background: this.props.color,
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
              position: "relative",
              fontSize: 10,
              marginRight: 5
            }}
          >
            {this.props.note}
          </b>
        </button>
      </div>
    );
  }
}

export default Tine;
