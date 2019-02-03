import React from "react";
import { render } from "react-dom";

const App = (
  <div>App</div>
);

const elm = document.getElementById("app");
if (elm) {
  render(App, elm);
}
