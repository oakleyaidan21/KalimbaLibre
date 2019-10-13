//component that contains the forms to input things like song title, time signature, tempo, etc
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ConfigContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stringToGive: "",
      title: this.props.title,
      keySig: this.props.keySig,
      tempo: this.props.tempo,
      time: this.props.time,
      song: this.props.song
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props !== nextProps) {
      this.setState({
        title: nextProps.title,
        keySig: nextProps.keySig,
        tempo: nextProps.tempo,
        time: nextProps.time,
        song: nextProps.song
      });
    }
  };

  configStrings = event => {
    console.log(event.target.value);
    this.setState({ stringToGive: event.target.value });
  };

  configTitle() {
    console.log(this.state.stringToGive);
    this.props.onConfigButton(this.state.stringToGive, "title");
  }

  configKey() {
    this.props.onConfigButton(this.state.stringToGive, "key");
    console.log("hi");
  }
  configTempo() {
    this.props.onConfigButton(this.state.stringToGive, "tempo");
    console.log("hi");
  }
  configSongString() {
    this.props.onConfigButton(this.state.stringToGive, "songString");
  }

  render() {
    return (
      <div
        id="configContainer"
        style={{
          display: "inline-block",
          height: 420,
          width: "21%",
          background: "#D4D4D4",
          borderRadius: 10,
          top: 75,
          left: 20,
          position: "absolute",
          padding: 10
        }}
      >
        <Form>
          <Form.Group controlId="formBasic">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="sm"
              placeholder={this.state.title}
              onChange={this.configStrings}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            id="confBtn"
            onClick={event => {
              event.preventDefault();
              this.configTitle();
            }}
          >
            Set Title
          </Button>
        </Form>

        <Form>
          <Form.Group controlId="formBasic">
            <Form.Label>Key Signature</Form.Label>
            <Form.Control
              size="sm"
              placeholder={this.state.keySig}
              onChange={this.configStrings}
            />
            <Form.Text className="text-muted">
              Example: "C", where uppercase letter = major and lowercase letter
              = minor
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            onClick={event => {
              event.preventDefault();
              this.configKey();
            }}
          >
            Set Major
          </Button>
        </Form>
        <Form>
          <Form.Group controlId="formBasic">
            <Form.Label>Tempo</Form.Label>
            <Form.Control
              size="sm"
              placeholder={this.state.tempo}
              onChange={this.configStrings}
            />
            <Form.Text className="text-muted">Example: "120"</Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            onClick={event => {
              event.preventDefault();
              this.configTempo();
            }}
          >
            Set Tempo
          </Button>
        </Form>
      </div>
    );
  }
}

export default ConfigContainer;
