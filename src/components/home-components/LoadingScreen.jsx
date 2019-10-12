import React, { Component } from "react";
import { CircleLoader } from "react-spinners/CircleLoader";

class LoadingScreen extends Component {
  state = {};
  render() {
    return (
      <div>
        <CircleLoader
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export default LoadingScreen;
