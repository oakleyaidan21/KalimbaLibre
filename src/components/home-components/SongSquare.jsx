import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { navigate } from "@reach/router";
import ReactTooltip from "react-tooltip";
import { FaCopy, FaPencilAlt, FaTrash, FaPlay } from "react-icons/fa";
import dbLocation from "../../localVariables";

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
      private: this.props.private,
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
      fetch(dbLocation + "/ksongs/" + this.state.id, {
        method: "DELETE"
      }).then(response => {});
      this.setState({ hidden: true });
    }
  };

  copySelf = () => {
    var userNameToPutIn = this.state.user;
    if (this.props.curUser !== "none") {
      console.log("here");
      userNameToPutIn = this.props.curUser;
    }
    fetch(dbLocation + "/ksongs", {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title + "(copy)",
        keysig: this.state.keySig,
        tempo: this.state.tempo,
        length: this.state.length,
        songString: this.props.songString,
        username: userNameToPutIn
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(resJSON => {})
      .catch(error => console.error({ Error: error }));
    this.props.reFetch();
  };

  goToSong = () => {
    navigate("/newtab/", {
      state: { userID: this.state.user, dbID: this.state.id }
    });
  };

  render() {
    let buttons;

    if (!this.props.isDb) {
      buttons = (
        <div style={{ float: "left" }}>
          <Button
            data-tip="Edit"
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
            <FaPencilAlt />
          </Button>
          <Button
            data-tip="Make a copy"
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
            <FaCopy />
          </Button>
          <Button
            data-tip="Delete"
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
            <FaTrash />
          </Button>
        </div>
      );
    } else {
      buttons = (
        <div style={{ float: "left" }}>
          <Button
            variant="success"
            style={{
              width: 230,
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
            Save to your songs
          </Button>
        </div>
      );
    }
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
          <div>
            <Button
              style={{
                width: 40,
                marginTop: 25,
                marginRight: 20,
                height: 40,
                borderRadius: 25,
                float: "left",
                verticalAlign: "middle",
                textAlign: "center",
                lineHeight: "15px"
              }}
            >
              <FaPlay data-tip="Preview (coming soon!)" />
            </Button>
            {buttons}
          </div>
        </div>
      );
    }
    return (
      <div id="songSquare" style={{ marginTop: 10 }}>
        <ReactTooltip />
        {toBeRendered}
      </div>
    );
  }
}

export default SongSquare;
