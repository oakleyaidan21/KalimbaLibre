import React, { Component } from "react";
import MIDISounds from "midi-sounds-react";

class MidiEx extends Component {
  playTestInstrument() {
    this.midiSounds.playChordNow(3, [60], 2.5);
  }
  render() {
    return (
      <div className="midiEx">
        <header className="midiEx-header">
          <p>
            <button onClick={this.playTestInstrument.bind(this)}> Play </button>
          </p>
          <p>Component</p>
          <MIDISounds
            ref={ref => (this.midiSounds = ref)}
            appElementName="root"
            instruments={[3]}
          />
          <hr />
        </header>
      </div>
    );
  }
}

export default MidiEx;
