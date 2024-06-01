import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/dark.css";
import "./styles/icons/icons.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

//creating redux store --------
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const store = configureStore({ reducer: rootReducer }, composeWithDevTools());
// -----------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
