import React, { createContext, useContext, useReducer } from "react";
import { Socket, Presence } from 'phoenix';

import { SOCKET_URL, CHANNELS } from '../config';

const SOCKET_CONNECTED = "SOCKET_CONNECTED";
const SOCKET_ERROR = "SOCKET_ERROR";
const SOCKET_CLOSED = "SOCKET_CLOSED";

const CHANNEL_CONNECTED = 'CHANNEL_CONNECTED';
const CHANNEL_DISCONNECTED = 'CHANNEL_DISCONNECTED';
// Errors
const CONNECT_CHANNEL_ERROR = 'CONNECT_CHANNEL_ERROR';
const CONNECT_CHANNEL_TIMEOUT = 'CONNECT_CHANNEL_TIMEOUT';
const CHANNEL_ERROR = 'CHANNEL_ERROR';
const CHANNEL_CLOSED = 'CHANNEL_CLOSE';
// Presences
const DISPATCH_PRESENCE_SYNC = 'DISPATCH_PRESENCE_SYNC';

const defaultState = {
    isConnected: false,
    socket: null,
    // 
    channels: {},
    presences: {},
};

const listBy = (id, { metas: [first, ...rest] }) =>
    Object.assign({}, first, { id, count: rest.length + 1 });

const reducer = (state, action) => {
    let newState;
    let copy = {};

    switch (action.type) {
        // Socket
        case SOCKET_CONNECTED:
            newState = { ...state, isConnected: true, socket: action.payload };
            break;

        case SOCKET_ERROR:
        case SOCKET_CLOSED:
            newState = { ...state, isConnected: false, socket: null };
            break;

        // Channels
        case CHANNEL_CONNECTED:
            copy = Object.assign({}, state.channels);
            copy[action.payload.topic] = action.payload.channel;
            newState = { ...state, channels: copy };
            break;

        case CHANNEL_ERROR:
        case CHANNEL_CLOSED:
        case CONNECT_CHANNEL_ERROR:
        case CONNECT_CHANNEL_TIMEOUT:
            copy = Object.assign({}, state.presences);
            delete copy[action.payload.topic];
            newState = { ...state, presences: copy };
            break;

        case CHANNEL_DISCONNECTED:
            copy = Object.assign({}, state.channels);
            delete copy[action.payload.topic];
            newState = { ...state, channels: copy };
            break;

        case DISPATCH_PRESENCE_SYNC:
            copy = Object.assign({}, state.presences);
            copy[action.payload.topic] = action.payload.presences;
            newState = { ...state, presences: copy };
            break;

        default:
            newState = Object.assign({}, state);
            break;
    }
    console.log(state, action, newState);

    return newState;
};

const usePhxReducer = (initialState = defaultState) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const openSocket = (options = {}) => {
        const newSocket = new Socket(SOCKET_URL, options);
        newSocket.connect();

        // This will also be triggered when socket reconnect
        newSocket.onOpen(() => dispatch({ type: SOCKET_CONNECTED, payload: newSocket }));
        newSocket.onError(() => dispatch({ type: SOCKET_ERROR }));
        newSocket.onClose(() => dispatch({ type: SOCKET_CLOSED }));
        return newSocket;
    };

    const closeSocket = () => {
        // This code seems to cause problem! Closing the socket change state...

        // Warning: Can't perform a React state update on an unmounted component. 
        // This is a no-op, but it indicates a memory leak in your application. 
        // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

        // if (state.socket) {
        //   try {
        //     state.socket.disconnect();
        //   } catch (err) {
        //     // eslint-disable-next-line no-console
        //     console.log(err);
        //   }
        // }
        dispatch({ type: SOCKET_CLOSED });
    };

    const leaveChannel = topic => {
        const channel = state.channels[topic];

        if (channel) {
            if (channel.state === 'joined') {
                try {
                    channel.leave();
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.log(err);
                }
            }
        }
        dispatch({ type: CHANNEL_DISCONNECTED, payload: { topic } });
    };

    const send = (topic, command, payload) => {
        const message = `SOCKET SEND -> Topic : ${topic}, Type : ${command}, Payload : ${JSON.stringify(payload)}`;

        const channel = state.channels[topic];
        if (channel) {
            // eslint-disable-next-line no-console
            console.log(message);

            return channel.push(command, payload);
        } else {
            // eslint-disable-next-line no-console
            console.log(`${message} failed`);
        }
    };

    const defaultCallback = payload => console.log("SOCKET RECEIVE: ", payload);

    const joinChannel = (topic, callback = defaultCallback) => {
        if (!state.isConnected) {
            // eslint-disable-next-line no-console
            console.log("Socket is not connected");
            return;
        }

        const topicPrefix = topic.split(':')[0];

        // SAMPLE CHANNEL_INFO
        // {
        //   presence: false,
        //   send: ["ping"],
        //   receive: ["ping", "pong"]
        // }
        const channelInfo = CHANNELS[topicPrefix];

        if (channelInfo) {
            const channel = _buildChannel(topic, channelInfo.receive, callback);
            if (channelInfo.presence) { _setPresence(channel) }
        } else {
            // eslint-disable-next-line no-console
            console.log(`Unknown topic : ${topic}`);
        }
    };

    const isChannelConnected = topic => state.channels[topic] &&
        state.channels[topic].state === "joined";

    // PRIVATE

    const _buildChannel = (topic, receive, callback) => {
        const channel = state.socket.channel(topic, {});

        // Create channels events from a list
        if (receive) {
            receive.forEach(type =>
                channel.on(type, payload => callback({ topic, type, payload }))
            );
        }

        channel.join()
            .receive('ok', () =>
                dispatch({ type: CHANNEL_CONNECTED, payload: { topic, channel } }))
            .receive('error', ({ reason }) =>
                dispatch({ type: CONNECT_CHANNEL_ERROR, payload: { topic, error: reason } }))
            .receive('timeout', () => {
                // eslint-disable-next-line no-console
                console.log('Networking issue. Still waiting...');
                dispatch({ type: CONNECT_CHANNEL_TIMEOUT, payload: { topic, error: 'Networking issue. Still waiting...' } });
            });

        channel.onError(() =>
            dispatch({ type: CHANNEL_ERROR, payload: { topic, error: 'there was an error!' } })
        );
        channel.onClose(() => {
            dispatch({ type: CHANNEL_CLOSED, payload: { topic, error: 'the channel has gone away gracefully' } })
        });

        return channel;
    }

    const _setPresence = channel => {
        const presence = new Presence(channel);
        const { topic } = channel;

        presence.onSync(() => {
            // TODO: Fix Warning
            // This happens the first time You connect!
            // It might be related to presence object not being cleaned...
            //
            // Warning: Can't perform a React state update on an unmounted component. 
            // This is a no-op, but it indicates a memory leak in your application. 
            // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
            // in Member (created by App)
            //
            dispatch({
                type: DISPATCH_PRESENCE_SYNC,
                payload: { topic, presences: presence.list(listBy) }
            })
        });

        // detect if user has joined for the 1st time or from another tab/device
        presence.onJoin((_id, current, newPres) => {
            if (!current) {
                // eslint-disable-next-line no-console
                console.log("user has entered for the first time", newPres)
            } else {
                // eslint-disable-next-line no-console
                console.log("user additional presence", newPres)
            }
        });

        // detect if user has left from all tabs/devices, or is still present
        presence.onLeave((_id, current, leftPres) => {
            if (current.metas.length === 0) {
                // eslint-disable-next-line no-console
                console.log("user has left from all devices", leftPres)
            } else {
                // eslint-disable-next-line no-console
                console.log("user left from a device", leftPres)
            }
        });

        return presence;
    }

    const actions = {
        openSocket, closeSocket,
        joinChannel, leaveChannel, send,
        isChannelConnected,
    };

    return { state, actions };
}

const PhxContext = createContext();

const PhxProvider = ({ children }) => {
    const { state, actions } = usePhxReducer();
    return (
        <PhxContext.Provider value={{ state, actions }}>
            {children}
        </PhxContext.Provider>
    )
}

export default PhxProvider;

export const usePhx = () => useContext(PhxContext);
