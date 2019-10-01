import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Holder from "./holder";

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
            <Holder />
            </div>
        );
    }
}

export default Config;