import React, { useEffect } from "react";

import useFlash from "../hooks/useFlash";

const DELAY = 5;

const Flash = () => {
    const [flash, setFlash] = useFlash();

    useEffect(() => {
        if (flash) {
            let timer = setTimeout(() =>
                setFlash(null), DELAY * 1000
            );
            return () => clearTimeout(timer)
        }
    }, [flash]);

    if (!flash) { return null };
    return (
        <div className="alert" role="alert">
            {flash}
            <button
                onClick={() => setFlash(null)}
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close">
                Close
            </button>
        </div>
    )
}

export default Flash;