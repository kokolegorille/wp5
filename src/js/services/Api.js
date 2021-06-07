import { ROOT_URL } from "../config/";

const authHeaders = (token, method) => ({
    method,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    credentials: "same-origin",
});

const guestHeaders = (data, method = "POST") => ({
    method,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(data)
});

const Api = {
    // POST
    signin: params =>
        fetch(`${ROOT_URL}/authentication`, guestHeaders({ session: params })),

    signup: params =>
        fetch(`${ROOT_URL}/registration`, guestHeaders({ user: params })),

    // AUTHENTIFIED
    // PATCH
    refreshToken: token => 
        fetch(`${ROOT_URL}/authentication/refresh`, { session: { token } }, 
        authHeaders(token, "PATCH")),

    // DELETE
    signout: token => 
        fetch(`${ROOT_URL}/authentication`, 
        authHeaders(token, "DELETE")),
};

export default Api;
