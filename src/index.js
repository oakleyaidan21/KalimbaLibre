import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import {Router} from "@reach/router";
import Config from "./config";




ReactDOM.render(
<Router>
    <App path="/"/>
    <Config path="config" />
</Router>
    , 
    document.getElementById("root")
);

var myDiv = document.getElementById("holder");
myDiv.scrollTop = myDiv.scrollHeight;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
