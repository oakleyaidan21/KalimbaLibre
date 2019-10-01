import React, { Component } from 'react';

class InfoContainer extends Component {
    state = {  
        desc: this.props.desc
            }
    render() {
        return (
            <div style={{width: 300, height: 150,  left: 20, background: "#D4D4D4", borderRadius: 25, top: 60, position: "absolute", padding: 10, display: "inline-block"}}>
                {this.state.desc}
            </div>
        );
    }
}

export default InfoContainer;