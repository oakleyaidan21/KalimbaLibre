//horizontal container of 14 notes that go across the tines
import React, { Component } from "react";
import Note from "../music-components/Note";

class TotalNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundcolor: this.props.color,
      renderPlus: false,
      id: this.props.id,
      selected: this.props.selected
    };
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  handleSelection = childData => {
    if (!this.state.selected) {
      this.setState({ backgroundcolor: childData });
    }

    if (childData === "transparent") {
      this.setState({ renderPlus: false });
    } else {
      this.setState({ renderPlus: true });
    }
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ backgroundcolor: nextProps.color });
  };

  handleNoteClick = (passID, tnID, notename, time, remove) => {
    var temp = this.props.notes;
    if (remove) {
      temp[passID].color = "transparent";
      temp[passID].selected = false;
      this.props.onPassingUpNote(tnID, notename, time, remove, passID);
    } else {
      temp[passID].color = "purple";
      temp[passID].selected = true;
      this.props.onPassingUpNote(tnID, notename, time, remove, passID);
    }
  };

  lastPassDown = (tNoteID, noteName, t, id) => {
    this.props.children[id].handleNoteClick(tNoteID, noteName, t, id, true);
  };

  handleSelectionE = () => {
    if (!this.state.renderPlus) {
      this.setState({ renderPlus: true });
    }
    this.setState({ backgroundcolor: "rgb(247,255,0,0.5)" });
  };

  handleSelectionL = () => {
    if (this.state.renderPlus) {
      this.setState({ renderPlus: false });
    }
    this.setState({ backgroundcolor: "transparent" });
  };

  handleTickClick = () => {
    this.props.passUpTick(this.state.id);
  };

  handleMinusClick = () => {
    this.props.passUpMinus(this.state.id);
  };

  handleMeasureClick = () => {
    this.setState({ selected: true });
    this.props.passUpMeasure(this.state.id);
  };

  render() {
    var bg = this.state.backgroundcolor;
    if (this.state.selected) {
      bg = "rgb(117,121,255,0.5)";
    }
    let renderPlusContext = "+";
    let renderMinusContext = "-";
    let renderMeasure = this.props.amountOfTNotes - this.state.id;
    if (!this.state.renderPlus) {
      renderPlusContext = "";
      renderMinusContext = "";
      renderMeasure = "";
    }
    return (
      <div
        id="totalNote"
        style={{
          width: 670,
          height: 40,
          background: bg
        }}
      >
        {this.props.notes.map((note, index) => (
          <Note
            time={this.props.curTime}
            rest={note.rest}
            name={note.name}
            color={note.color}
            id={this.state.id}
            selected={note.selected}
            onSelectNote={this.handleSelection}
            onHandleNoteClick={this.handleNoteClick}
            noteID={note.noteID}
            instrument={this.props.instrument}
            imageToRender={note.imageToRender}
            isResting={this.props.isResting}
          />
        ))}
        <button
          style={{
            float: "left",
            marginLeft: 4,
            marginRight: 4,
            background: "transparent",
            border: 0,
            width: 30,
            height: 40,
            textAlign: "center"
          }}
          onMouseEnter={this.handleSelectionE}
          onMouseLeave={this.handleSelectionL}
          onClick={this.handleTickClick}
        >
          {renderPlusContext}
        </button>
        <button
          style={{
            float: "left",
            marginLeft: 4,
            marginRight: 4,
            background: "transparent",
            border: 0,
            width: 30,
            height: 40,
            textAlign: "center"
          }}
          onMouseEnter={this.handleSelectionE}
          onMouseLeave={this.handleSelectionL}
          onClick={this.handleMinusClick}
        >
          {renderMinusContext}
        </button>
        <button
          style={{
            float: "left",
            marginLeft: 4,
            marginRight: 4,
            background: "transparent",
            border: 0,
            width: 30,
            height: 40,
            textAlign: "center"
          }}
          onMouseEnter={this.handleSelectionE}
          onMouseLeave={this.handleSelectionL}
          onClick={this.handleMeasureClick}
        >
          {renderMeasure}
        </button>
      </div>
    );
  }
}

export default TotalNote;
