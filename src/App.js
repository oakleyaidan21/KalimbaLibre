import React from "react";
import Holder from "./components/holder";
import Selector from "./components/selector";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NoteHolder from "./components/noteHolder";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="localhost:3000">Kalimba Linda</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="localhost:3000">Home</Nav.Link>
          <Nav.Link href="localhost:3000">Configure</Nav.Link>
          <Nav.Link href="localhost:3000">Export</Nav.Link>
        </Nav>
        <Form inline>
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <Holder style={{ position: "absolute", topMargin: "0px" }} />
      <NoteHolder style={{ position: "absolute" }} />
      <Selector />
    </div>
  );
}

export default App;
