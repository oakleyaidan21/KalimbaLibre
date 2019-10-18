import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NewTab from "./NewTab";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";
import HomePage from "./HomePage.js";
import LandingPage from "./LandingPage";
import SongDatabasePage from "./SongDatabasePage.js";

ReactDOM.render(
  <Router>
    <LandingPage path="/" />
    <NewTab path="/newtab/" />
    <HomePage path="/homepage/" />
    <SongDatabasePage path="/database/" />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
