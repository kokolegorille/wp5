import { useContext } from "react";

import { ThemeContext } from "./useApp";

// Wrap custom context into a hook
const useTheme = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    if (!setTheme) {
        throw new Error("The ThemeProvider is missing")
    }

    return [theme, setTheme];
}

export default useTheme;