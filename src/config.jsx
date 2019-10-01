import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Holder from "./components/display-components/holder";
import InfoContainer from "./components/display-components/infoContainer";

class Config extends Component {
    state = {  }
    render() {
        return (
            <div className="config">
                <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="localhost:3000">Kalimba Libre</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/config">Configure</Nav.Link>
                    <Nav.Link href="localhost:3000">Export</Nav.Link>
                </Nav>
                <Form inline>
                <Button variant="outline-info" onClick={this.handlePlay}>
                    PLAY
                </Button>

                </Form>
            </Navbar>
            <InfoContainer desc={"Config:\n Use this page to set up notes your kalimba will use, as well as your desired time signature, temp, etc. You can also use it to extend the kalimba's length"}></InfoContainer>
            <Holder />
            </div>
        );
    }
}

export default Config;