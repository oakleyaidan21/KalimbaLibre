//contains every component that has to do with inputting notes into the kalimba's song
import React, { Component } from "react";
import NoteContainer from "./NoteContainer";
import TineContainer from "./TineContainer";

class KalimbaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleTopLevelPlay = () => {
    this.refs.noteChild.goThroughEachTotalNote();
  };

  handleScrollBottom = () => {
    document.getElementById("holder").scrollTop = document.getElementById(
      "holder"
    ).scrollHeight;
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ curTime: nextProps.curTime });
    this.setState({ tineNotes: nextProps.tineNotes });
  };

  handleHolderPassUp = (tNote, noteName, time, remove, noteID) => {
    this.props.onLastPassUp(tNote, noteName, time, remove, noteID);
  };

  render() {
    return (
      <div
        id="holder"
        style={{
          width: 665,
          margin: "0 auto",
          height: 600,
          background: "#D4D4D4",
          borderRadius: "0 0 10px 10px",
          overflow: "auto",
          position: "relative"
        }}
      >
        <TineContainer
          amountOfTNotes={this.props.amountOfTNotes}
          tineNotes={this.props.tineNotes}
        />
        <NoteContainer
          totalNotes={this.props.totalNotes}
          onHolderPassUp={this.handleHolderPassUp}
          amountOfTNotes={this.props.amountOfTNotes}
          tineNotes={this.props.tineNotes}
          kalimba={this.props.kalimba}
          playing={this.props.playing}
          tempo={this.props.tempo}
          curTime={this.props.curTime}
          imageToRender={this.props.imageToRender}
          onTickPassUp={this.props.finalTickPass}
          onMinusPassUp={this.props.finalMinusPass}
          isResting={this.props.isRest}
          tieMode={this.props.tieMode}
          tiedNote={this.props.tiedNote}
          toggleTied={this.props.toggleTied}
        />
      </div>
    );
  }
}

export default KalimbaContainer;
