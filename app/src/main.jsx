import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import JopProvider from "./context/jopProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <JopProvider>
        <App />
      </JopProvider>
    </BrowserRouter>
  </React.StrictMode>
);
