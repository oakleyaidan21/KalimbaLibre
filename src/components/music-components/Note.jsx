//buttons in layed over the tines for playing notes
import React, { Component } from "react";
import Quarter from "../../noteImages/quarter_note.png";
import Eighth from "../../noteImages/eighth_note.png";
import Half from "../../noteImages/half_note.png";
import Sixteenth from "../../noteImages/sixteenth_note.png";
import D_Half from "../../noteImages/dotted_half.png";
import D_Eighth from "../../noteImages/dotted_eighth.png";
import D_Quarter from "../../noteImages/dotted_quarter.png";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
      rest: this.props.rest,
      color: this.props.color,
      selected: this.props.selected,
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
        this.props.name,
        this.state.time,
        true
      );
    } else {
      //add it to the notes to be played
      console.log(this.state.time);
      this.setState({ selected: true });
      if (this.state.time === 4) {
        this.setState({ imageToRender: Quarter });
        console.log("set to 4");
      }
      if (this.state.time === 8) {
        console.log("set to 8");
        this.setState({ imageToRender: Eighth });
      }
      if (this.state.time === 2) {
        console.log("set to 2");
        this.setState({ imageToRender: Half });
      }
      if (this.state.time === 16) {
        console.log("set to 16");
        this.setState({ imageToRender: Sixteenth });
      }
      if (this.state.time === 1.5) {
        console.log("set to dotted half");
        this.setState({ imageToRender: D_Half });
      }
      if (this.state.time === 6) {
        console.log("set to dotted eighth");
        this.setState({ imageToRender: D_Eighth });
      }
      if (this.state.time === 3) {
        console.log("set to dotted quarter");
        this.setState({ imageToRender: D_Quarter });
      }
      if (this.state.time) this.props.instrument.play(this.props.name);
      this.props.onHandleNoteClick(
        this.state.noteID,
        this.state.id,
        this.props.name,
        this.state.time,
        false
      );
    }
  };

  renderIcon() {
    if (this.state.selected) {
      return (
        <img
          src={this.state.imageToRender}
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
