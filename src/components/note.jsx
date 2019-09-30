import React, { Component } from "react";

class Note extends Component {
  state = {
    time: this.props.time,
    rest: this.props.rest,
    name: this.props.name,
    color: this.props.color
  };

  handleSelectionE = () => {
    this.props.onSelectNote("rgb(247,255,0,0.5)");
    this.setState({color : "rgb(0,255,85,0.6)"});
    console.log(this.state.color);
  };
  handleSelectionL = () => {
    this.props.onSelectNote("transparent");
    this.setState({color : "transparent"});
  };

  render() {
    return (
      <div>
        <button
          style={{
            float: "left",
            marginLeft: "4px",
            marginRight: "4px",
            background: this.state.color,
            border: 0,
            width: "24px",
            height: "40px"
          }}
          onMouseEnter={this.handleSelectionE.bind(this)}
          onMouseLeave={this.handleSelectionL.bind(this)}
        ></button>
      </div>
    );
  }
}

export default Note;
