//buttons for selecting note types
import React, { Component } from "react";

class SelectorButton extends Component {
  state = {
    label: this.props.label
  };
  buttonStyle = {
    margin: "0 auto",
    marginTop: 20,
    maxWidth: 30
  };

  handleSelection = () => {
    this.props.onSelectNote(this.state.label, this.props.image);
  };

  render() {
    let whatToRender = this.state.label;
    if (this.props.image != null) {
      whatToRender = (
        <img
          src={this.props.image}
          alt=""
          style={{
            maxWidth: "100%",
            maxHeight: "100%"
          }}
        />
      );
    }
    return (
      <div id="selector">
        <button
          onClick={this.handleSelection.bind(this)}
          style={this.buttonStyle}
          className="btn btn-secondary btn-sm"
        >
          {whatToRender}
        </button>
      </div>
    );
  }
}

export default SelectorButton;
