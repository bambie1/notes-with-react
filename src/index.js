import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDKtz40DHZLniYCcBfWg3_fBLGxget5y1M",
  authDomain: "react-notes-b2f44.firebaseapp.com",
  databaseURL: "https://react-notes-b2f44.firebaseio.com",
  projectId: "react-notes-b2f44",
  storageBucket: "react-notes-b2f44.appspot.com",
  messagingSenderId: "317238611124",
  appId: "1:317238611124:web:53d1c43654c1f6b3451be1",
  measurementId: "G-5LDEDZ0HGM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
