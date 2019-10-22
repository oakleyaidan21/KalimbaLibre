import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { navigate } from "@reach/router";

class SongCreator extends Component {
  state = {
    title: "none",
    keySig: "C"
  };

  create = () => {
    console.log(this.state.title + " " + this.state.keySig);
    navigate("/newtab/", {
      state: {
        userID: this.props.user,
        dbID: 0,
        passedKeySig: this.state.keySig,
        passedTitle: this.state.title
      }
    });
  };
  render() {
    return (
      <div
        style={{
          width: 500,
          height: 300,
          backgroundColor: "white",
          position: "relative",
          margin: "0 auto",
          marginTop: 100,
          borderRadius: 10,
          padding: 15,
          opacity: 1.0,
          zIndex: "10"
        }}
      >
        <div style={{ fontSize: 20, fontWeight: "bold", margin: "0 auto" }}>
          Create Song
        </div>
        <Form style={{ fontSize: "20px" }}>
          <Form.Group controlId="formUser">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="sm"
              placeholder={"Enter a Title"}
              onChange={text => {
                this.setState({ title: text.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formPass">
            <Form.Label>Key Signature</Form.Label>
            <Form.Control
              size="sm"
              placeholder={"Enter a Key Signature"}
              onChange={text => {
                this.setState({ keySig: text.target.value });
              }}
            />
            <Form.Text style={{ fontSize: "10px" }}>
              In the form of note+accidental. ex: Gb = "G flat major", g# = "G
              sharp major"
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            size="sm"
            id="loginBtn"
            onClick={() => {
              this.create();
            }}
          >
            Create
          </Button>
        </Form>
      </div>
    );
  }
}

export default SongCreator;
