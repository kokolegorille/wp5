import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

// Separate Flash context into value and setter
export const FlashContext = createContext();
export const FlashSetContext = createContext();

export const AuthContext = createContext();

export const LanguageContext = createContext();

import useAuth from "./useAuth";
import Api from "../services/Api";

const AppProvider = ({ children }) => {
    // can be dark, or default
    const [theme, setTheme] = useState("default");

    // Flash message
    const [flash, setFlash] = useState();

    // Language switcher
    const [lang, setLang] = useState("en");

    // Authentication
    const { state, actions } = useAuth(Api);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <FlashContext.Provider value={{ flash }}>
                <FlashSetContext.Provider value={{ setFlash }}>
                    <LanguageContext.Provider value={{ lang, setLang }}>
                        <AuthContext.Provider value={{ state, actions }}>
                            {children}
                        </AuthContext.Provider>
                    </LanguageContext.Provider>
                </FlashSetContext.Provider>
            </FlashContext.Provider>
        </ThemeContext.Provider>
    )
}

export default AppProvider;

// Wrap custom context into a hook
export const useTheme = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    if (!setTheme) {
        throw new Error("The ThemeProvider is missing")
    }

    return [theme, setTheme];
}

// Wrap custom context into a hook
export const useFlash = () => {
    const { flash } = useContext(FlashContext);
    const { setFlash } = useContext(FlashSetContext);

    if (!setFlash) {
        throw new Error("The FlashSetProvider is missing")
    }

    return [flash, setFlash];
}

// Wrap custom context into a hook
export const useLanguage = () => {
    const { lang, setLang } = useContext(LanguageContext);

    if (!setLang) {
        throw new Error("The LanguageProvider is missing")
    }

    return [lang, setLang];
}

// Wrap custom context into a hook
export const useAppAuth = () => useContext(AuthContext);
