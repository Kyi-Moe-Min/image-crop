import React from "react";
import ReactDOM from "react-dom";
import A from "./app";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <A />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
