import React from "react";

import useTheme from "./hooks/useTheme";

import Demo from "./views/Demo";

import Flash from "./components/Flash";
import ThemeSwitch from "./components/ThemeSwitch";

const App = () => {
    const [theme] = useTheme();

    return (
        <>
            <div id="main" data-theme={theme}>
                <Flash />
                <ThemeSwitch />
                <Demo />
            </div>
            <div id="modal-root"></div>
        </>
    )
}

export default App;