import { useState, useEffect } from "react";

const getSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

const useWindowSize = () => {
    const [size, setSize] = useState(getSize());
    useEffect(() => {
        const handleResize = () => setSize(getSize());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])
    return size;
}

export default useWindowSize;