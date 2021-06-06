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

const processResponse = response => {
    if (response.ok) {
        response
            .json()
            .then(data => console.log(data))
    } else {
        response
            .json()
            .then(data => console.log(data))
    }
}

const Api = {
    // POST
    signin: params =>
        fetch(`${ROOT_URL}/authentication`, guestHeaders({ session: params }))
            .then(response => processResponse(response))
            .catch(error => console.log("Network error", error)),

    signup: params =>
        fetch(`${ROOT_URL}/registration`, guestHeaders({ user: params }))
            .then(response => processResponse(response))
            .catch(error => console.log("Network error", error)),

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
