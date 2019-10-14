//horizontal container of 14 notes that go across the tines
import React, { Component } from "react";
import Note from "../music-components/Note";

class TotalNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundcolor: this.props.color,
      renderPlus: false,
      id: this.props.id
    };
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  handleSelection = childData => {
    this.setState({ backgroundcolor: childData });
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
    console.log(this.state.id);
    this.props.passUpTick(this.state.id);
  };

  render() {
    let renderPlusContext = this.props.amountOfTNotes - this.state.id;
    if (!this.state.renderPlus) {
      renderPlusContext = "";
    }
    return (
      <div
        id="totalNote"
        style={{
          width: 590,
          height: 40,
          background: this.state.backgroundcolor,
          borderBottom: "2px solid transparent"
        }}
      >
        {this.props.notes.map((note, index) => (
          <Note
            time={this.props.curTime}
            rest={note.rest}
            name={this.props.tineNotes[index].note}
            color={note.color}
            id={this.state.id}
            selected={note.selected}
            onSelectNote={this.handleSelection}
            onHandleNoteClick={this.handleNoteClick}
            noteID={note.noteID}
            instrument={this.props.instrument}
            imageToRender={note.imageToRender}
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
      </div>
    );
  }
}

export default TotalNote;
