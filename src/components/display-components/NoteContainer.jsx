import React, { Component } from "react";
import TotalNote from "./TotalNote";
import { delay } from "q";

class NoteContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalNotes: [],
      notes: [
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[0],
          color: "transparent",
          selected: false,
          noteID: 0
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[1],
          color: "transparent",
          selected: false,
          noteID: 1
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[2],
          color: "transparent",
          selected: false,
          noteID: 2
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[3],
          color: "transparent",
          selected: false,
          noteID: 3
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[4],
          color: "transparent",
          selected: false,
          noteID: 4
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[5],
          color: "transparent",
          selected: false,
          noteID: 5
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[6],
          color: "transparent",
          selected: false,
          noteID: 6
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[7],
          color: "transparent",
          selected: false,
          noteID: 7
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[8],
          color: "transparent",
          selected: false,
          noteID: 8
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[9],
          color: "transparent",
          selected: false,
          noteID: 9
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[10],
          color: "transparent",
          selected: false,
          noteID: 10
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[11],
          color: "transparent",
          selected: false,
          noteID: 11
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[12],
          color: "transparent",
          selected: false,
          noteID: 12
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[13],
          color: "transparent",
          selected: false,
          noteID: 13
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[14],
          color: "transparent",
          selected: false,
          noteID: 14
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[15],
          color: "transparent",
          selected: false,
          noteID: 15
        },
        {
          time: 4,
          rest: false,
          name: this.props.tineNotes[16],
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
    var temp = this.state.totalNotes;
    // console.log(
    //   "go through each " +
    //     this.state.totalNotes.length +
    //     " " +
    //     this.state.totalNotes
    // );
    // console.log("0: ", this.state.totalNotes[0].color);
    // temp[0].color = "purple";
    // console.log(this.state.totalNotes[0].color);
    // this.setState({ totalNotes: temp });
    // for (var i = this.props.amountOfTNotes; i >= 0; i--) {
    //   // temp[i].color = "blue";
    //   // this.setState({ totalNotes: temp });
    //   if (i !== this.props.amountOfTNotes - 1) {
    //     temp[i + 1].color = "transparent";
    //   }
    //   await delay(500);
    //   temp[i].color = "rgb(247,255,0,0.5)";
    //   this.setState({ totalNotes: temp });
    // }
    // temp[0].color = "transparent";
    // this.setState({ totalNotes: temp });
    for (var i = this.props.amountOfTNotes - 1; i >= 0; i--) {
      if (i !== this.props.amountOfTNotes - 1) {
        temp[i + 1].color = "transparent";
      }
      await delay(500);
      console.log("temp");
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

  handlePassingUpNote = (passID, passName, color) => {
    var temp = this.state.totalNotes;
    temp[passID].color = color;
    this.setState({ totalNotes: temp });
    this.props.onHolderPassUp(passID, passName, color);
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
              onPassingUpNote={totalNote.onPassingUpNote}
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
