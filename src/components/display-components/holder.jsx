import React, { Component } from "react";

import NoteHolder from "./noteHolder";
import TineHolder from "./tineHolder";

class Holder extends Component {
  state = {
    amountOfTNotes: this.props.amountOfTNotes
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
        <TineHolder amountOfTNotes={this.state.amountOfTNotes}></TineHolder>
        <NoteHolder
          onHolderPassUp={this.handleHolderPassUp}
          amountOfTNotes={this.state.amountOfTNotes}
        />
      </div>
    );
  }
}

export default Holder;
