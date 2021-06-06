import React, { useContext } from "react";

import { ThemeContext } from "../hooks/useApp";

const ThemeSwitch = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const nextTheme = theme === "dark" ? "default" : "dark";
    return (
        <a onClick={() => setTheme(nextTheme)}>Switch to {nextTheme} mode</a>
    )
}

export default ThemeSwitch;