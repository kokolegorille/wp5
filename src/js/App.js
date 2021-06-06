import React, { lazy, Suspense } from "react";

import { useAppAuth, useTheme } from "./hooks/useApp";

const Demo = lazy(() => import("./views/Demo"));
const Signin = lazy(() => import("./views/Signin"));

import Flash from "./components/Flash";
import ThemeSwitch from "./components/ThemeSwitch";

const App = () => {
    const { state } = useAppAuth();
    const [theme] = useTheme();

    const { isAuthenticated } = state;

    return (
        <div id="main" data-theme={theme}>
            <Flash />
            <ThemeSwitch />
            <Suspense fallback={<div>Loading...</div>}>
                { !isAuthenticated ? <Demo /> : <Signin /> }
            </Suspense>
        </div>
    )
}

export default App;