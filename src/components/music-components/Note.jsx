//buttons in layed over the tines for playing notes
import React, { Component } from "react";
import Quarter from "../../noteImages/quarter_note.png";
import Eighth from "../../noteImages/eighth_note.png";
import Half from "../../noteImages/half_note.png";
import Sixteenth from "../../noteImages/sixteenth_note.png";
import D_Half from "../../noteImages/dotted_half.png";
import D_Eighth from "../../noteImages/dotted_eighth.png";
import D_Quarter from "../../noteImages/dotted_quarter.png";
import Whole from "../../noteImages/whole_note.png";
import algebra, { Equation } from "algebra.js";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      time: this.props.time,
      resting: this.props.isResting,
      rest: this.props.rest,
      color: this.props.color,
      selected: this.props.selected,
      id: this.props.id,
      noteID: this.props.noteID,
      images: [
        { time: 1, image: Whole },
        { time: 4 / 3, image: D_Half },
        { time: 2, image: Half },
        { time: 8 / 3, image: D_Quarter },
        { time: 4, image: Quarter },
        { time: 16 / 3, image: D_Eighth },
        { time: 8, image: Eighth },
        { time: 16, image: Sixteenth }
      ],
      imageToRender: this.props.imageToRender
    };
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleSelectionE = this.handleSelectionE.bind(this);
    this.handleSelectionL = this.handleSelectionL.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  getImageIndex = time => {
    for (var i = 0; i < this.state.images.length; i++) {
      if (this.state.images[i].time === parseFloat(time)) {
        return this.state.images[i].image;
      }
    }
    return this.state.images[0].image;
  };

  //for tied notes it adds up all the notes in the array and finds what time it needs to be
  remakeTime = () => {
    var totalMS = 0;
    for (var i = 0; i < this.props.tiedNote.length; i++) {
      totalMS += (4 * (1000 / (120 / 60))) / this.props.tiedNote[i];
    }
    console.log(totalMS);
    var exp1 = algebra.parse("x*" + totalMS.toString());
    var exp2 = algebra.parse("4*(1000/(120/60))");
    var eq = new Equation(exp1, exp2);
    console.log(eq);
    var answer = eq.solveFor("x");
    console.log("x = " + answer.toString());
    return answer;
  };

  componentDidMount = () => {};

  handleSelectionE = () => {
    if (this.state.color !== "purple") {
      this.setState({ color: "rgb(0,255,85,0.6)" });
    }
    this.props.onSelectNote("rgb(247,255,0,0.5)");
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ time: nextProps.time });
    this.setState({ resting: nextProps.isResting });
    this.setState({ selected: nextProps.selected });
    this.setState({ imageToRender: nextProps.imageToRender });
  };

  handleSelectionL = () => {
    if (this.state.color !== "purple") {
      this.setState({ color: "transparent" });
    }
    this.props.onSelectNote("transparent");
  };

  //changes the clicked note to an image of a note, and also sends which notes to play to the NoteContainer
  handleNoteClick = () => {
    var t = this.state.time;
    var c = "transparent";

    if (this.props.tieMode) {
      t = this.remakeTime();
      c = "rgb(143, 186, 255, 0.5)";
    }
    if (this.state.selected === true) {
      //remove it from the notes to be played
      this.setState({ selected: false });
      this.setState({ color: "transparent" });
      this.props.onHandleNoteClick(
        this.state.noteID,
        this.state.id,
        this.props.name,
        t,
        true
      );
    } else {
      //add it to the notes to be played
      this.setState({ selected: true });
      this.props.instrument.play(this.props.name);
      this.setState({ color: c });
      this.props.onHandleNoteClick(
        this.state.noteID,
        this.state.id,
        this.props.name,
        t,
        false
      );
      //change its image
      this.setState({ imageToRender: this.getImageIndex(t) });
    }
  };

  renderIcon = () => {
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
            height: "40px",
            outline: "none"
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
