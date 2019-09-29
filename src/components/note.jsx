import React, { Component } from "react";

class Note extends Component {
  state = {
    time: this.props.time,
    rest: this.props.rest,
    name: this.props.name,
    color: this.props.color
  };

  handleNoteClick = () => {
    console.log(this.state.name);
  };

  render() {
    return (
      <div>
        <button
          style={{
            position: "relative",
            display: "inline",
            background: this.state.color + ", 0.7)",
            width: "20px",
            height: "20px",
            border: "0"
          }}
          onClick={this.handleNoteClick.bind(this)}
        ></button>
      </div>
    );
  }
}

export default Note;
