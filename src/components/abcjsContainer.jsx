import React, { Component } from "react";
import Abcjs from "react-abcjs";

class AbcjsContainer extends Component {
  state = {
    abcjsStructure:
      "X: 1\n" +
      "T: Kalimba\n" +
      "M: 4/4\n" +
      "L: 1/4\n" +
      "Q: 1/4=120\n" +
      "C: Aidan\n" +
      "S: \n" +
      "R: Dunno\n" +
      "K:C\n" +
      "|",
    song: this.props.song
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ song: nextProps });
  }
  songParser() {
    var noteString = "";
    var temp = Array.apply(null, Array(5)).map(function(x, i) {
      return { passID: "-1", passName: "" };
    });
    console.log(this.state.song);
    for (var i = 0; i < this.state.song.length; i++) {
      console.log("hi");
      temp = temp[this.state.song.passID].concat(this.state.song.passName);
      noteString.concat(this.state.song.passName);
      console.log(this.state.song[i].passName);
    }
    var newstructure = this.state.abcjsStructure.concat(noteString + "|");
    this.setState({ abcjsStructure: newstructure });
  }

  render() {
    if (this.props.isRendered) {
      this.songParser();
    }

    if (!this.props.isRendered) {
      return null;
    }
    return (
      <div style={{ height: 300, width: 500 }}>
        <Abcjs
          abcNotation={this.state.abcjsStructure}
          parserParams={{}}
          engraverParams={{ responsive: "resize" }}
          renderParams={{ viewpointHorizontal: true }}
        />
      </div>
    );
  }
}

export default AbcjsContainer;
