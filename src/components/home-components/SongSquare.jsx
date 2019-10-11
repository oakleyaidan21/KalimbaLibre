import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "@reach/router";

class SongSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      keySig: this.props.keySig,
      tempo: this.props.tempo,
      length: this.props.length,
      id: this.props.id,
      curLocalStorage: [],
      songString: this.props.songString,
      hidden: false
    };
  }

  deleteSelf = () => {
    fetch("https://localhost:3000/" + this.state.id, {
      method: "DELETE"
    }).then(response => {});

    this.setState({ hidden: true });
  };

  copySelf = () => {
    fetch("https://localhost:3000/", {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title + "(copy)",
        keysig: this.state.keySig,
        tempo: this.state.tempo,
        length: this.state.kalimbaLength,
        songString: this.props.songString,
        username: "carrot"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(resJSON => {
        console.log("got here");
        console.log(resJSON);
      })
      .catch(error => console.error({ Error: error }));
  };

  render() {
    let toBeRendered;
    if (this.state.hidden === false) {
      toBeRendered = (
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
              Key
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
          <Link to={"/newtab/" + this.state.id}>
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
            >
              EDIT
            </Button>
          </Link>
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
    return <>{toBeRendered}</>;
  }
}

export default SongSquare;
