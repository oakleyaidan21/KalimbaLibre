import React, { Component } from "react";
import { getInstruments } from "mobx-music";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
      rest: this.props.rest,
      name: this.props.name,
      color: this.props.color,
      selected: false,
      id: this.props.id,
      noteID: this.props.noteID
    };
  }

  handleSelectionE = () => {
    if (this.state.color !== "purple") {
      this.setState({ color: "rgb(0,255,85,0.6)" });
    }
    this.props.onSelectNote("rgb(247,255,0,0.5)");
  };

  handleSelectionL = () => {
    if (this.state.color !== "purple") {
      this.setState({ color: "transparent" });
    }
    this.props.onSelectNote("transparent");
  };

  handleNoteClick = () => {
    if (this.state.color === "purple") {
      this.setState({ color: "transparent" });
    } else {
      this.setState({ color: "purple" });
    }
  };

  render() {
    return (
      <div id="note">
        <button
          style={{
            float: "left",
            marginLeft: "4px",
            marginRight: "4px",
            background: this.state.color,
            border: 0,
            width: "24px",
            height: "40px"
          }}
          onMouseEnter={this.handleSelectionE.bind(this)}
          onMouseLeave={this.handleSelectionL.bind(this)}
          onClick={this.handleNoteClick.bind(this)}
        ></button>
      </div>
    );
  }
}

export default Note;
