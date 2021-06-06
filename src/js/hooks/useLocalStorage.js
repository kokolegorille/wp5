import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const storedValue = window.localStorage.getItem(key);
        if (storedValue) {
            setValue(storedValue);
        }
    }, [key]);

    useEffect(() => {
        window.localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;