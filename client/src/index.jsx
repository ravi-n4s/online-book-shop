import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "./utils";

// axios configuration
// setting the token in the header for all requests
axios.defaults.headers.common["Authorization"] = getToken();
// setting the base backend url for all requests
axios.defaults.baseURL = "http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routes />
    <ToastContainer />
  </React.StrictMode>
);
