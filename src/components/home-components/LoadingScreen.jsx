import React, { Component } from "react";
import { SemipolarSpinner } from "react-epic-spinners";

class LoadingScreen extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "grey",
          opacity: "0.5",
          position: "absolute",
          margin: "0 auto",
          textAlign: "center",
          verticalAlign: "center",
          lineHeight: "50%",
          zIndex: 10
        }}
      >
        <SemipolarSpinner
          style={{ margin: "0 auto", top: "50%", opacity: 1 }}
          size="200"
        />
        <p
          id="loadingtext"
          style={{ margin: "0 auto", top: "50%", fontSize: 50 }}
        >
          Setting things up...
        </p>
      </div>
    );
  }
}

export default LoadingScreen;
