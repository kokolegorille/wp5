import "./css/app.scss";

import React from "react";
import { render } from "react-dom";

import App from "./js/App";
import AppProvider from "./js/hooks/useApp";

const app = document.getElementById("app");
render(
    <AppProvider>
        <App />
    </AppProvider>, 
    app
);