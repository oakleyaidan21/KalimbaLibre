//buttons in layed over the tines for playing notes
import React, { Component } from "react";
import Quarter from "../../quarter_note.png";
import Eighth from "../../eighth_note.png";

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
      noteID: this.props.noteID,
      imageToRender: null
    };
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleSelectionE = this.handleSelectionE.bind(this);
    this.handleSelectionL = this.handleSelectionL.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  handleSelectionE = () => {
    if (this.state.color !== "purple") {
      this.setState({ color: "rgb(0,255,85,0.6)" });
    }
    this.props.onSelectNote("rgb(247,255,0,0.5)");
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ time: nextProps.time });
  };

  handleSelectionL = () => {
    if (this.state.color !== "purple") {
      this.setState({ color: "transparent" });
    }
    this.props.onSelectNote("transparent");
  };

  //changes the clicked note to an image of a note, and also sends which notes to play to the NoteContainer
  handleNoteClick = () => {
    if (this.state.selected === true) {
      //remove it from the notes to be played
      this.setState({ selected: false });
      this.setState({ color: "transparent" });
      this.props.onHandleNoteClick(
        this.state.noteID,
        this.state.id,
        this.state.name,
        this.state.time,
        true
      );
    } else {
      //add it to the notes to be played
      console.log("adding " + this.state.time);
      this.setState({ selected: true });
      if (this.state.time === 4) {
        this.setState({ imageToRender: Quarter });
        console.log("set to 4");
      }
      if (this.state.time === 8) {
        console.log("set to 8");
        this.setState({ imageToRender: Eighth });
      }
      this.props.instrument.play(this.state.name);
      this.props.onHandleNoteClick(
        this.state.noteID,
        this.state.id,
        this.state.name,
        this.state.time,
        false
      );
    }
  };

  renderIcon() {
    if (this.state.selected) {
      if (this.state.imageToRender === Quarter) {
        return (
          <img
            src={require("../../quarter_note.png")}
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto"
            }}
          />
        );
      }
      if (this.state.imageToRender === Eighth) {
        return (
          <img
            src={require("../../eighth_note.png")}
            alt=""
            style={{
              maxWidth: "100%",
              height: "auto"
            }}
          />
        );
      }
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
