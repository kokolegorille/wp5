import React, { useState, lazy, Suspense } from "react";

const Signin = lazy(() => import("../components/Signin"));
const Signup = lazy(() => import("../components/Signup"));

const Landing = () => {
    const [signMode, setSignMode] = useState("Signin");
    const nextSignMode = signMode === "Signup" ? "Signin" : "Signup";
    const nextLabel = signMode === "Signup" ? "Sign in" : "Sign up";
    return (
        <div>
            <h3>{signMode}</h3>
            <Suspense fallback={<div>Loading...</div>}>
                { signMode === "Signin" ? <Signin /> : <Signup /> }
            </Suspense>
            or <a onClick={() => setSignMode(nextSignMode)}>{nextLabel}</a>
        </div>
    )
}

export default Landing;