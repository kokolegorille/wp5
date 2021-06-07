import React, { lazy, Suspense } from "react";

import { useAppAuth, useTheme } from "./hooks/useApp";

const Member = lazy(() => import("./views/Member"));
const Landing = lazy(() => import("./views/Landing"));

import Flash from "./components/Flash";
import ThemeSwitch from "./components/ThemeSwitch";

const App = () => {
    const { state } = useAppAuth();
    const [theme] = useTheme();

    const { isAuthenticated } = state;

    console.log(state);

    return (
        <div id="main" data-theme={theme}>
            <Flash />
            <ThemeSwitch />
            <Suspense fallback={<div>Loading...</div>}>
                { isAuthenticated ? <Member /> : <Landing /> }
            </Suspense>
        </div>
    )
}

export default App;