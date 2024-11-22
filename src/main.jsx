import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import { Provider } from "react-redux";
import { store } from "./store/store.js";
=======
import { Provider } from 'react-redux';
import { store } from './store/store.js'
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
=======
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
>>>>>>> d0bc3ec2be50f58b062607ba55098bfe263d7069
    </Provider>
  </React.StrictMode>
);
