import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/pages/App";
import firebase from './config/firebase';

console.log(firebase);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
