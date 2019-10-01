import React, { Component } from "react";

import NoteHolder from "./noteHolder";
import TileHolder from "./tileHolder";

class Holder extends Component {
  state = {};

  handleTileClick() {
    console.log("hi");
  }

  handleHolderPassUp = (passID, passName) => {
    this.props.onLastPassUp(passID, passName);
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
        <TileHolder></TileHolder>
        <NoteHolder onHolderPassUp={this.handleHolderPassUp} />
      </div>
    );
  }
}

export default Holder;
