//buttons for selecting note types
import React, { Component } from "react";

class SelectorButton extends Component {
  state = {
    label: this.props.label
  };
  buttonStyle = {
    margin: "0 auto",
    marginTop: 20
  };

  handleSelection = () => {
    this.props.onSelectNote(this.state.label);
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
