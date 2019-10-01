import React, { Component } from "react";

class SelectorButton extends Component {
  state = {
    label: this.props.label
  };
  buttonStyle = {
    float: "left",
    marginLeft: "35px",
    marginRight: "35px",
    marginTop: "20px",
    marginBottom: "20px",
    border: "0",
    width: "30px",
    height: "30px"
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
      <div>
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
