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
    this.setState({ stringToGive: event.target.value });
  };

  configTitle() {
    this.props.onConfigButton(this.state.stringToGive, "title");
  }

  configKey() {
    this.props.onConfigButton(this.state.stringToGive, "key");
  }
  configTempo() {
    this.props.onConfigButton(this.state.stringToGive, "tempo");
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
          height: 300,
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
            Change Title
          </Button>
        </Form>
        <Form style={{ marginTop: 30 }}>
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
            Change Tempo
          </Button>
        </Form>
      </div>
    );
  }
}

export default ConfigContainer;
