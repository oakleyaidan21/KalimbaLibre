import React, { Component } from "react";
import {getInstruments} from 'mobx-music';




class Note extends Component {
  
  state = {
    time: this.props.time,
    rest: this.props.rest,
    name: this.props.name,
    color: this.props.color
  };


  handleSelectionE = () => {
    this.props.onSelectNote("rgb(247,255,0,0.5)");
    this.setState({color : "rgb(0,255,85,0.6)"});
  };
  handleSelectionL = () => {
    this.props.onSelectNote("transparent");
    this.setState({color : "transparent"});
  };



  handleNoteClick = () => {
    console.log(this.state.name);
    (async () => {
      var {instruments, playingNotes} = await getInstruments(["kalimba"]);
      var instrument = instruments.get("kalimba");
      instrument.play(this.state.name, 500);
      playingNotes.get(this.state.name);
      setTimeout(() => {
        instrument.stop(this.state.name);
      }, 250);
    })()

    
  }

  

  render() {
   
    return ( 
      <div>
        <button
          style={{
            float: "left",
            marginLeft: "4px",
            marginRight: "4px",
            background: this.state.color,
            border: 0,
            width: "24px",
            height: "40px"
          }}
          onMouseEnter={this.handleSelectionE.bind(this)}
          onMouseLeave={this.handleSelectionL.bind(this)}
          onClick={this.handleNoteClick.bind(this)}
        ></button>
      </div>
    );
  }
}

export default Note;
