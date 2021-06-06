import { useEffect, useReducer } from "react";

// Increase TICK_RATE if You want seconds hand fluid movement.
const TICK_RATE = 1000;

const TICK = "TICK";

const defaultState = {
    hrsRotn: 0,
    minsRotn: 0,
    secsRotn: 0,
}

const reducer = (state, action) => {
    let newState;

    switch (action.type) {
        case TICK:
            const date = action.payload;
            const msecsElapsed = date.getMilliseconds();
            const secsElpased = date.getSeconds() + msecsElapsed / 1000
            const minsElapsed = date.getMinutes() + secsElpased / 60
            const hrsElapsed = date.getHours() % 12 + minsElapsed / 60
            newState = {
                hrsRotn: (hrsElapsed * 360 / 12) % 360,
                minsRotn: (minsElapsed * 360 / 60) % 360,
                secsRotn: (secsElpased * 360 / 60) % 360,
            }
            break;

        default:
            newState = Object.assign({}, state);
            break;
    }
    // console.log(state, action, newState);

    return newState;
};

const useClock = (initialState = defaultState) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const tick = (date = new Date) => dispatch({ type: TICK, payload: date });

    useEffect(() => {
        const interval = setInterval(() => tick(new Date), TICK_RATE);
        return () => clearInterval(interval);
    }, []);

    return state;
}

export default useClock;