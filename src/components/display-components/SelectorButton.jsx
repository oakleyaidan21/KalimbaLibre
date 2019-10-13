//buttons for selecting note types
import React, { Component } from "react";

class SelectorButton extends Component {
  state = {
    label: this.props.label
  };
  buttonStyle = {
    // float: "left",
    // // marginLeft: "35px",
    // // marginRight: "35px",
    // left: "10px",
    // marginLeft: "auto",
    // marginRight: "auto",
    // display: "block",
    // marginTop: "20px",
    // right: 0,
    // // marginBottom: "20px",
    // border: "0",
    // width: "30px",
    // height: "30px"
    margin: "0 auto",
    marginTop: 20
  };

  handleSelection = () => {
    if (this.state.label === "PLAY") {
      this.props.onPlay();
    } else {
      console.log(this.state.label);
      this.props.onSelectNote(this.state.label);
    }
  };

  render() {
    return (
      <div id="selector">
        <button
          onClick={this.handleSelection.bind(this)}
          style={this.buttonStyle}
          className="btn btn-primary btn-sm"
        >
          {this.state.label}
        </button>
      </div>
    );
  }
}

export default SelectorButton;
