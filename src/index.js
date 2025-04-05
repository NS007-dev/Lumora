import React from "react";
import ReactDOM from "react-dom/client"; // Notice the `client` import here
import "./index.css"; // Global styles (if any)
import "./styles/theme.css"; // Import the theme file
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
