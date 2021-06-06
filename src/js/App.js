import React, { useContext } from "react";

import Demo from "./views/Demo";
import { ThemeContext } from "./hooks/useApp";

const App = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div id="main" data-theme={theme}>
            {
                theme === "dark" &&
                <a onClick={() => setTheme("default")}>Switch to Default mode</a>
            }
            {
                theme !== "dark" &&
                <a onClick={() => setTheme("dark")}>Switch to Dark mode</a>
            }
            <Demo />
        </div>
    )
}

export default App;