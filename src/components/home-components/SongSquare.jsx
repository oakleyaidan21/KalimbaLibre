import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link, navigate } from "@reach/router";
import { IoIosPlay } from "react-icons/io";

class SongSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      keySig: this.props.keySig,
      tempo: this.props.tempo,
      length: this.props.length,
      id: this.props.id,
      user: this.props.user,
      curLocalStorage: [],
      songString: this.props.songString,
      hidden: false
    };
  }

  deleteSelf = () => {
    var r = window.confirm(
      "Are you sure you want to delete " + this.state.title + "?"
    );
    if (r === true) {
      fetch(
        "https://warm-inlet-29455.herokuapp.com/kalimba_songs/" + this.state.id,
        {
          method: "DELETE"
        }
      ).then(response => {});
      this.setState({ hidden: true });
    }
  };

  copySelf = () => {
    fetch("https://warm-inlet-29455.herokuapp.com/kalimba_songs", {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title + "(copy)",
        keysig: this.state.keySig,
        tempo: this.state.tempo,
        length: this.state.length,
        songString: this.props.songString,
        username: this.state.user
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
    this.props.reFetch();
  };

  goToSong = () => {
    navigate("/newtab/", {
      state: { userID: this.state.user, dbID: this.state.id }
    });
  };

  render() {
    let toBeRendered;
    if (this.state.hidden === false) {
      toBeRendered = (
        <div
          style={{
            width: 300,
            height: 150,
            background: "grey",
            margin: 15,
            marginBottom: 50,
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
              height: 25,
              fontSize: 50,
              textAlign: "center"
            }}
          >
            <div
              style={{
                width: 100,
                height: 25,
                borderRight: "2px solid black",
                float: "left",
                fontSize: "17px"
              }}
            >
              Key:
              {" " + this.state.keySig}
            </div>
            <div
              style={{
                width: 100,
                height: 25,
                borderRight: "2px solid black",
                position: "relative",
                float: "left",
                fontSize: "17px"
              }}
            >
              Tempo:
              {" " + this.state.tempo}
            </div>
            <div
              style={{
                width: 100,
                height: 30,
                position: "relative",
                float: "left",
                fontSize: "17px"
              }}
            >
              Len:
              {" " + this.state.length}
            </div>
          </div>
          <Button
            style={{
              width: 40,
              marginRight: 20,
              height: 40,
              borderRadius: 25,
              // fontSize: 20,
              verticalAlign: "middle",
              textAlign: "center",
              lineHeight: "15px"
            }}
          >
            <IoIosPlay />
          </Button>
          {/* <Link
            to={"/newtab/" + this.state.user + "/" + this.state.id}
            target="_blank"
          > */}
          <Button
            style={{
              width: 70,
              margin: 5,
              height: 40,
              borderRadius: 25,
              fontSize: 20,
              verticalAlign: "middle",
              textAlign: "center",
              lineHeight: "20px"
            }}
            onClick={() => {
              this.goToSong();
            }}
          >
            EDIT
          </Button>
          {/* </Link> */}
          <Button
            variant="warning"
            style={{
              width: 70,
              height: 40,
              margin: 5,
              fontSize: 20,
              verticalAlign: "middle",
              borderRadius: 25,
              textAlign: "center",
              lineHeight: "20px"
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
              width: 70,
              height: 40,
              margin: 5,
              borderRadius: "25px",
              fontSize: 20,
              verticalAlign: "middle",
              textAlign: "center",
              lineHeight: "20px"
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
    return (
      <div id="songSquare" style={{ marginTop: 10 }}>
        {toBeRendered}
      </div>
    );
  }
}

export default SongSquare;
