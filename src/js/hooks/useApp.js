
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const LanguageContext = createContext();

const AppProvider = ({ children }) => {
    // can be dark, or default
    const [theme, setTheme] = useState("default");

    const [lang, setLang] = useState("en");

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <LanguageContext.Provider value={{lang, setLang}}>
                {children}
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    )
}

export default AppProvider;