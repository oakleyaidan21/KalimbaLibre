import React, { Component } from "react";

import NoteContainer from "./NoteContainer";
import TineContainer from "./TineContainer";

class KalimbaContainer extends Component {
  state = {
    amountOfTNotes: this.props.amountOfTNotes,
    tineNotes: this.props.tineNotes
  };

  handleTileClick() {
    console.log("hi");
  }

  handleHolderPassUp = (passID, passName, color) => {
    this.props.onLastPassUp(passID, passName, color);
  };

  render() {
    return (
      <div
        id="holder"
        style={{
          width: "545px",
          margin: "0 auto",
          height: 600,
          background: "#D4D4D4",
          borderRadius: "0 0 25px 25px",
          overflow: "auto",
          position: "relative"
        }}
      >
        <TineContainer
          amountOfTNotes={this.state.amountOfTNotes}
          tineNotes={this.state.tineNotes}
        />
        <NoteContainer
          onHolderPassUp={this.handleHolderPassUp}
          amountOfTNotes={this.state.amountOfTNotes}
        />
      </div>
    );
  }
}

export default KalimbaContainer;