import React, { Component } from "react";
import TotalNote from "./TotalNote";
import { delay } from "q";
import { getInstruments } from "mobx-music";

class NoteContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalNotes: [],
      notes: [
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[0].note,
          color: "transparent",
          selected: false,
          noteID: 0
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[1].note,
          color: "transparent",
          selected: false,
          noteID: 1
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[2].note,
          color: "transparent",
          selected: false,
          noteID: 2
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[3].note,
          color: "transparent",
          selected: false,
          noteID: 3
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[4].note,
          color: "transparent",
          selected: false,
          noteID: 4
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[5].note,
          color: "transparent",
          selected: false,
          noteID: 5
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[6].note,
          color: "transparent",
          selected: false,
          noteID: 6
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[7].note,
          color: "transparent",
          selected: false,
          noteID: 7
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[8].note,
          color: "transparent",
          selected: false,
          noteID: 8
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[9].note,
          color: "transparent",
          selected: false,
          noteID: 9
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[10].note,
          color: "transparent",
          selected: false,
          noteID: 10
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[11].note,
          color: "transparent",
          selected: false,
          noteID: 11
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[12].note,
          color: "transparent",
          selected: false,
          noteID: 12
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[13].note,
          color: "transparent",
          selected: false,
          noteID: 13
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[14].note,
          color: "transparent",
          selected: false,
          noteID: 14
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[15].note,
          color: "transparent",
          selected: false,
          noteID: 15
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[16].note,
          color: "transparent",
          selected: false,
          noteID: 16
        }
      ]
    };

    // this.componentDidMount = this.componentDidMount.bind(this);
    this.goThroughEachTotalNote = this.goThroughEachTotalNote.bind(this);
  }

  //goes through each totalNote and highlights them
  goThroughEachTotalNote = async () => {
    const { instruments, playingNotes } = await getInstruments(["kalimba"]);
    const kalimba = instruments.get("kalimba");

    var temp = this.state.totalNotes;
    for (var i = temp.length - 1; i >= 0; i--) {
      await delay(500);
      if (i !== this.props.amountOfTNotes - 1) {
        temp[i + 1].color = "transparent";
      }
      for (var j = 0; j < temp[i].notes.length; j++) {
        if (temp[i].notes[j].color === "purple") {
          console.log("play " + temp[i].notes[j].name);
          kalimba.play(temp[i].notes[j].name, 1000);
          playingNotes.get(temp[i].notes[j].name);
        }
      }

      // await delay(500);
      temp[i].color = "rgb(247,255,0,0.5)";
      this.setState({ totalNotes: temp });
    }
    this.setState({ totalNotes: temp });
  };

  //populates the totalNotes Array
  componentDidMount = () => {
    var temp = [];
    for (var i = 0; i < this.props.amountOfTNotes; i++) {
      var four = false;
      if (i % 4 === 0 || i === this.state.propsNotes - 1) {
        four = true;
      }
      temp.push({
        key: i,
        time: 4,
        rest: false,
        color: "transparent",
        is4: four,
        onPassingUpNote: this.handlePassingUpNote,
        id: i,
        notes: this.state.notes
      });
    }
    this.setState({ totalNotes: temp });
  };

  handlePassingUpNote = (passID, tnID, color) => {
    var temp = this.state.totalNotes;
    temp[tnID].notes[passID].color = color;
    this.setState({ totalNotes: temp });
  };

  render() {
    return (
      <div
        id="noteHolder"
        style={{
          position: "absolute",
          zIndex: "10",
          top: 0,
          float: "left"
        }}
      >
        <button onClick={this.goThroughEachTotalNote}>test</button>
        <>
          {this.state.totalNotes.map(totalNote => (
            <TotalNote
              key={totalNote.key}
              time={totalNote.time}
              rest={totalNote.rest}
              color={totalNote.color}
              is4={totalNote.is4}
              onPassingUpNote={this.handlePassingUpNote}
              id={totalNote.id}
              notes={totalNote.notes}
            />
          ))}
        </>
      </div>
    );
  }
}

export default NoteContainer;
