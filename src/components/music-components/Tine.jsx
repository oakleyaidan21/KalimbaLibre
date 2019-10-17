//emulate the tiles on a kalimba
import React, { Component } from "react";

class Tine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      len: this.props.len * 15 + this.props.amountOfTNotes * 40
    };
  }
  handleClick = () => {
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
            paddingTop: this.props.len * 15 + this.props.amountOfTNotes * 40,
            float: "left",
            background: this.props.color,
            width: "28px",
            height: this.props.len * 15 + this.props.amountOfTNotes * 40,
            border: "2px solid black",
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
