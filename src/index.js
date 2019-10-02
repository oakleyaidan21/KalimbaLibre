import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";

ReactDOM.render(
  <Router>
    <App path="/" />
  </Router>,
  document.getElementById("root")
);

// html2canvas(document.querySelector("#capture")).then(canvas => {
//   document.body.appendChild(canvas);
// });

var myDiv = document.getElementById("holder");
myDiv.scrollTop = myDiv.scrollHeight;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
