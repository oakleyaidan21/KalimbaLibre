//buttons in layed over the tines for playing notes
import React, { Component } from "react";

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
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleSelectionE = this.handleSelectionE.bind(this);
    this.handleSelectionL = this.handleSelectionL.bind(this);
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

  //changes the clicked note to an image of a note, and also sends which notes to play to the NoteContainer
  handleNoteClick = () => {
    if (this.state.color === "purple") {
      this.setState({ selected: false });
      this.setState({ color: "transparent" });
      this.props.onHandleNoteClick(
        this.state.noteID,
        this.state.id,
        this.state.name
      );
    } else {
      this.setState({ selected: true });
      this.setState({color: "purple"});
      this.props.instrument.play(this.state.name);
      this.props.onHandleNoteClick(
        this.state.noteID,
        this.state.id,
        this.state.name
      );
    }
  };

  renderIcon(selected) {
    if (this.state.selected) {
      console.log("render click");
      return (
        <img
          src="src\quarter_note.png"
          alt=""
          style={{
            maxWidth: "100%",
            height: "auto"
          }}
        />
      );
    }
    return <></>;
  }

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
          onMouseEnter={this.handleSelectionE}
          onMouseLeave={this.handleSelectionL}
          onClick={this.handleNoteClick}
        >
          {this.renderIcon()}
        </button>
      </div>
    );
  }
}

export default Note;
