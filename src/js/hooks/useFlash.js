import { useContext } from "react";

import {
    FlashContext,
    FlashSetContext
} from "./useApp";

// Wrap custom context into a hook
const useFlash = () => {
    const { flash } = useContext(FlashContext);
    const { setFlash } = useContext(FlashSetContext);

    if (!setFlash) {
        throw new Error("The FlashSetProvider is missing")
    }

    return [flash, setFlash];
}

export default useFlash;
