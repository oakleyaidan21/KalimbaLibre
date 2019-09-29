import React from "react";
import logo from "./logo.svg";
import Holder from "./components/holder";
import Selector from "./components/selector";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="localhost:3000">Kalima Linda</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="localhost:3000">Home</Nav.Link>
          <Nav.Link href="localhost:3000">Configure</Nav.Link>
          <Nav.Link href="localhost:3000">Export</Nav.Link>
        </Nav>
        <Form inline>
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <Holder />
      <Selector />
    </div>
  );
}

export default App;
