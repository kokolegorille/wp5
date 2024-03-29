import React, { useEffect, lazy, Suspense } from "react";

import { useAppAuth, useTheme } from "./hooks/useApp";
import PhxProvider from "./hooks/usePhx";

const Member = lazy(() => import("./views/Member"));
const Landing = lazy(() => import("./views/Landing"));

import Auth from "./services/Auth";

import Flash from "./components/Flash";
import ThemeSwitch from "./components/ThemeSwitch";



const App = () => {
    const { state, actions } = useAppAuth();
    const [theme] = useTheme();

    const { isAuthenticated, token } = state;

    // Refresh from token on load from local storage
    useEffect(
        () => {
            const startToken = Auth.getToken();
            if (!startToken) return;
            actions.refreshToken(startToken);
        },
        []
    );

    // Persists token in Local storage when changed
    useEffect(
        () => {
            token ? Auth.setToken(token) : Auth.removeToken();
        },
        [token]
    );

    return (
        <div id="main" data-theme={theme}>
            <div className="container">
                <Flash />
                <ThemeSwitch />
                <Suspense fallback={<div>Loading...</div>}>
                    {isAuthenticated ? <PhxProvider><Member /></PhxProvider> : <Landing />}
                </Suspense>
            </div>
        </div>
    )
}

export default App;