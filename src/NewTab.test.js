import React from "react";
import ReactDOM from "react-dom";
import NewTab from "./NewTab";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NewTab />, div);
  ReactDOM.unmountComponentAtNode(div);
});
