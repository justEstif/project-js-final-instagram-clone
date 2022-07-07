import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase } from "./lib/firebase";

import "./styles/tailwind.css";
import "react-loading-skeleton/dist/skeleton.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <App />
  </FirebaseContext.Provider>
);
