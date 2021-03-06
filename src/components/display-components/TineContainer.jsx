//contains the tines you see on screen

import React, { Component } from "react";
import Tine from "../music-components/Tine";

class TineContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ tineNotes: nextProps.tineNotes });
  };

  render() {
    return (
      <div
        id="tineHolder"
        style={{
          width: 550,
          height: 600,
          position: "absolute",
          zIndex: 5,
          bottom: 0
        }}
      >
        {this.props.tineNotes.map((tine, index) => (
          <Tine
            note={this.props.tineNotes[index].note}
            len={tine.len}
            color={tine.color}
            amountOfTNotes={this.props.amountOfTNotes}
          />
        ))}
      </div>
    );
  }
}

export default TineContainer;
