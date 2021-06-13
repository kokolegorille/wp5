// Configure application endpoint

// DEVELOPMENT

const HOST = "localhost:4000";

export const ROOT_URL = `http://${HOST}/api`;
export const SOCKET_URL = `ws://${HOST}/socket`;

// Token Key
export const TOKEN_KEY = "wp5_reactH00ks_@ph0enix1_5AuthT0ken";

// The list of available channels, by topic
// Define a receive list per channel to set on channel event
export const CHANNELS = {
    system: {
        presence: false,
        receive: ["ping", "pong"]
    },
    lobby: {
        presence: true,
        receive: [
            // REQUESTS
            "list_requests",
            "request_created", "request_created_error",
            "request_cancelled", "request_accepted",
            // ROOMS
            "list_rooms",
            "room_created", "room_cancelled",
            // WORLDS
            "list_worlds",
            "world_created", "world_cancelled",
        ]
    },
    user: {
        presence: false,
        receive: [
            "ping_received",
            "join_room"
        ]
    },
    room: {
        presence: true,
        receive: [
            "room_updated", "room_cancelled",
        ]
    },
    world: {
        presence: true,
        receive: [
            "world_updated", "world_cancelled",
        ]
    },
};