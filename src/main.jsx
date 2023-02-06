import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import FirebaseContext from "./context/firebase";
import { firebase } from "./lib/firebase";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FirebaseContext.Provider value={{ firebase }}>
    <App />
  </FirebaseContext.Provider>
);
