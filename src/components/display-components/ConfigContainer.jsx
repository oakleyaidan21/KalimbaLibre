import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ConfigContainer extends Component {
  state = {
    time: "4/4",
    key: "C Major",
    tempo: "120"
  };
  render() {
    return (
      <div
        id="configHolder"
        style={{
          // width: 400,
          // left: 10,
          display: "inline-block",
          height: 650,
          width: 400,
          background: "#D4D4D4",
          borderRadius: 25,
          top: 60,
          position: "absolute",
          padding: 10
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Badge variant="info large">Config</Badge>
        </div>
        <Form>
          <Form.Group controlId="formBasic">
            <Form.Label>Title</Form.Label>
            <Form.Control size="sm" placeholder={"Title"} />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            onClick={() => {
              console.log("clicked");
            }}
          >
            Set Title
          </Button>
        </Form>
        <Form>
          <Form.Group controlId="formBasic">
            <Form.Label>Time Signature</Form.Label>
            <Form.Control size="sm" placeholder={this.state.time} />
            <Form.Text className="text-muted">
              Example: "4/4". Make sure it follows the form of "X/Y"
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            onClick={() => {
              console.log("clicked");
              //   this.setState({ time: this.input.value });
            }}
          >
            Change
          </Button>
        </Form>
        <Form>
          <Form.Group controlId="formBasic">
            <Form.Label>Key Signature</Form.Label>
            <Form.Control size="sm" placeholder={this.state.key} />
            <Form.Text className="text-muted">
              Example: "C Major". Make sure it follows the form of
              "Note(space)Quality"
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" size="sm">
            Change
          </Button>
        </Form>
        <Form>
          <Form.Group controlId="formBasic">
            <Form.Label>Tempo</Form.Label>
            <Form.Control size="sm" placeholder={this.state.tempo} />
            <Form.Text className="text-muted">Example: "120"</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" size="sm">
            Change
          </Button>
        </Form>
        <br></br>
        <b>
          You can set individual notes by clicking on the bottom of the tines{" "}
        </b>
      </div>
    );
  }
}

export default ConfigContainer;
