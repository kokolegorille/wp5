import React from "react";

import { useTheme } from "../hooks/useApp";

const ThemeSwitch = () => {
    const [theme, setTheme] = useTheme();
    const nextTheme = theme === "dark" ? "default" : "dark";
    return (
        <a onClick={() => setTheme(nextTheme)}>Switch to {nextTheme} mode</a>
    )
}

export default ThemeSwitch;