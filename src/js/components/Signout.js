import React from "react";

import { useAppAuth } from "../hooks/useApp";

const Signout = () => {
    const { state: { token, user }, actions } = useAppAuth();

    return (
        <div>
            Welcome {user.name}&nbsp;
            <a onClick={() => actions.signout(token)}>Sign out</a>
            <a onClick={() => actions.refreshToken(token)}>Refresh</a>
        </div>
    )
};

export default Signout;