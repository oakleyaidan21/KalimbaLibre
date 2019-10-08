import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class SongSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      keySig: this.props.keySig,
      tempo: 120,
      length: 40,
      id: this.props.id
    };
  }

  deleteSelf = () => {
    this.props.onDelete(this.state.id);
  };

  copySelf = () => {
    this.props.onCopy(this.state.id);
  };

  render() {
    console.log(this.state.id);
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
            padding: 10,
            overflowWrap: "word-break",
            fontSize: 20,
            verticalAlign: "middle",
            lineHeight: "100px"
          }}
        >
          "{this.state.title}"
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
              float: "left",

              fontSize: "20px"
            }}
          >
            Major
            <br />
            <div style={{ fontSize: "50px" }}>{this.state.keySig}</div>
          </div>
          <div
            style={{
              width: 100,
              height: 120,
              borderRight: "2px solid black",
              position: "relative",
              float: "left",
              fontSize: "20px"
            }}
          >
            Tempo
            <br />
            <div style={{ fontSize: "50px" }}>{this.state.tempo}</div>
          </div>
          <div
            style={{
              width: 100,
              height: 120,
              position: "relative",
              float: "left",
              fontSize: "20px"
            }}
          >
            Length
            <br />
            <div style={{ fontSize: "50px" }}>{this.state.length}</div>
          </div>
        </div>
        <Button
          style={{
            width: 100,
            height: 80,
            borderRadius: "0px 0px 0px 25px",
            fontSize: 30,
            verticalAlign: "middle",
            textAlign: "center",
            lineHeight: "80px"
          }}
          href="/newtab"
        >
          EDIT
        </Button>
        <Button
          variant="warning"
          style={{
            width: 100,
            height: 80,
            fontSize: 30,
            verticalAlign: "middle",
            borderRadius: 0,
            textAlign: "center",
            lineHeight: "80px"
          }}
          onClick={() => {
            this.copySelf();
          }}
        >
          COPY
        </Button>
        <Button
          variant="danger"
          style={{
            width: 100,
            height: 80,
            borderRadius: "0px 0px 25px 0px",
            fontSize: 30,
            verticalAlign: "middle",
            textAlign: "center",
            lineHeight: "80px"
          }}
          onClick={() => {
            this.deleteSelf();
          }}
        >
          X
        </Button>
      </div>
    );
  }
}

export default SongSquare;
