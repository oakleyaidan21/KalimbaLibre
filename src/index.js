import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NewTab from "./NewTab";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";
import HomePage from "./HomePage.js";
import LandingPage from "./LandingPage";

ReactDOM.render(
  <Router>
    <LandingPage path="/"></LandingPage>
    <NewTab path="/newtab/:dbID" />
    <HomePage path="/homepage/:userID" />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
