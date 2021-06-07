import { useReducer } from 'react';

const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
const SIGNIN_ERROR = 'SIGNIN_ERROR';
const SIGNUP_ERROR = 'SIGNUP_ERROR';
const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';
const SIGNOUT_ERROR = 'SIGNOUT_ERROR';
const CLEAR_ERRORS = "CLEAR_ERRORS";

const defaultState = {
    isAuthenticated: false,
    user: null,
    token: null,
    errorMessage: null,
    errors: {},
}

const reducer = (state, action) => {
    let newState;

    switch (action.type) {
        case REFRESH_TOKEN_SUCCESS:
        case SIGNIN_SUCCESS:
        case SIGNUP_SUCCESS:
            const { token, user } = action.payload;
            newState = {
                ...state,
                isAuthenticated: true,
                token,
                user,
                errorMessage: null,
                errors: {},
            };
            break;

        case SIGNIN_ERROR:
        case SIGNUP_ERROR:
        case REFRESH_TOKEN_ERROR:
        case SIGNOUT_ERROR:
            // Can be a string or an object
            // Can have an error key, or errors key

            newState = {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
            }

            if (typeof action.payload === "string") {
                newState = {
                    ...newState,
                    errorMessage: action.payload,
                    errors: {},
                }
            } else if (typeof action.payload === "object" && action.payload.error) {
                newState = {
                    ...newState,
                    errorMessage: action.payload.error,
                    errors: {},
                }
            } else if (typeof action.payload === "object" && action.payload.errors) {
                // Populate form errors
                newState = {
                    ...newState,
                    errorMessage: null,
                    errors: action.payload.errors,
                }
            } else {
                newState = {
                    ...newState,
                    errorMessage: JSON.stringify(action.payload),
                    errors: {},
                }
            }
            break;

        case SIGNOUT_SUCCESS:
            newState = {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                errorMessage: null,
                errors: {},
            };
            break;

        case CLEAR_ERRORS:
            newState = {
                ...state,
                errorMessage: null,
                errors: {},
            };
            break;

        default:
            newState = Object.assign({}, state);
            break;
    }
    // console.log(state, action, newState);

    return newState;
};

const useAuth = (api, initialState = defaultState) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const signin = params => {
        if (state.isAuthenticated) { return };
        api.signin(params)
            .then(response => {
                if (response.ok) {
                    response
                    .json()
                    .then(data => dispatch({ type: SIGNIN_SUCCESS, payload: data }))
                } else {
                    response
                    .json()
                    .then(data => dispatch({ type: SIGNIN_ERROR, payload: data.error }))
                }
            })
            .catch(error => dispatch({ type: SIGNIN_ERROR, payload: error }));
    };

    const signup = params => {
        if (state.isAuthenticated) { return };
        api.signup(params)
            .then(response => {
                if (response.ok) {
                    response
                    .json()
                    .then(data => dispatch({ type: SIGNUP_SUCCESS, payload: data }))
                } else {
                    response
                    .json()
                    .then(data => dispatch({ type: SIGNUP_ERROR, payload: data }))
                }
            })
            .catch(error => dispatch({ type: SIGNUP_ERROR, payload: error }));
    };

    const actions = {
        signin, signup
    };

    return { state, actions };
}

export default useAuth;