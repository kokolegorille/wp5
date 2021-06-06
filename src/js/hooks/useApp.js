
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

// Separate Flash context into value and setter
export const FlashContext = createContext();
export const FlashSetContext = createContext();

export const LanguageContext = createContext();

const AppProvider = ({ children }) => {
    // can be dark, or default
    const [theme, setTheme] = useState("default");

    // Flash message
    const [flash, setFlash] = useState();

    // Language switcher
    const [lang, setLang] = useState("en");

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <FlashContext.Provider value={{flash}}>
                <FlashSetContext.Provider value={{setFlash}}>
                    <LanguageContext.Provider value={{lang, setLang}}>
                        {children}
                    </LanguageContext.Provider>
                </FlashSetContext.Provider>
            </FlashContext.Provider>
        </ThemeContext.Provider>
    )
}

export default AppProvider;
