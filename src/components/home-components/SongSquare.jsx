import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class SongSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "None",
      key: "C",
      tempo: 120,
      length: 40
    };
  }
  render() {
    return (
      <div
        style={{
          width: 300,
          height: 300,
          background: "grey",
          margin: 15,
          borderRadius: 25,
          overflow: "none",
          float: "left",
          position: "relative"
        }}
      >
        <div
          style={{
            textAlign: "center",
            margin: "0 auto",
            width: 300,
            height: 100,
            background: "rgb(230,230,230)",
            borderRadius: "25px 25px 0px 0px",
            padding: 10
          }}
        >
          {this.state.title}
        </div>
        <div
          style={{
            width: 300,
            height: 120,
            fontSize: 50,
            textAlign: "center"
          }}
        >
          <div
            style={{
              width: 100,
              height: 120,
              borderRight: "2px solid black",
              float: "left"
            }}
          >
            {this.state.key}
          </div>
          <div
            style={{
              width: 100,
              height: 120,
              borderRight: "2px solid black",
              position: "relative",
              float: "left"
            }}
          >
            {this.state.tempo}
          </div>
          <div
            style={{
              width: 100,
              height: 120,
              position: "relative",
              float: "left"
            }}
          >
            {this.state.length}
          </div>
        </div>
        {/* <div
          style={{
            width: 300,
            height: 80,
            backgroundColor: "red",
            borderRadius: "0px 0px 25px 25px"
          }}
        >
          PLAY
        </div> */}
        <Button
          style={{
            width: 300,
            height: 80,
            borderRadius: "0px 0px 25px 25px",
            fontSize: 30
          }}
        >
          EDIT
        </Button>
      </div>
    );
  }
}

export default SongSquare;
