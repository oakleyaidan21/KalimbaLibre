import React, { Component } from "react";

class ComingSoon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          height: "70",
          width: "200",
          backgroundColor: "black",
          color: "white",
          left: 250,
          position: "absolute",
          borderRadius: 10,
          zIndex: 20
        }}
      >
        Coming Soon!
      </div>
    );
  }
}

export default ComingSoon;
