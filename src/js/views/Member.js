import React, { useEffect, useState, lazy, Suspense } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    useHistory
} from "react-router-dom";

import useWindowSize from "../hooks/useWindowSize";
//import useLocalStorage from "../hooks/useLocalStorage";
import { useAppAuth, useFlash, useTheme } from "../hooks/useApp";
import { usePhx } from "../hooks/usePhx";

import Clock from "../components/Clock";
import Modal from "../components/Modal";
import Signout from "../components/Signout";

const Lobby = lazy(() => import("./Lobby"));
const World = lazy(() => import("./World"));
const NotFound = lazy(() => import("./NotFound"));

const Member = () => {
    const { width, height } = useWindowSize();
    // const [user, setUser] = useLocalStorage("user", "Koko");

    const [showModal, setShowModal] = useState(null);

    const [theme] = useTheme();
    const [_, setFlash] = useFlash();

    const { state, actions } = usePhx();

    const { isConnected } = state;

    const {
        openSocket, closeSocket,
        joinChannel, leaveChannel,
    } = actions;

    const { state: { user, token } } = useAppAuth();

    const userTopic = `user:${user.id}`;

    const history = useHistory();

    // const { path, url } = useRouteMatch();

    // console.log(path, url);

    // Allowed types are defined in config!
    // The callback is an optional param of joinChannel
    const userCallback = ({ topic, type, payload }) => {
        switch (type) {
            case "join_room":
                // Server send a navigation event!
                history.push(`/rooms/${payload.room_id}`);
                break;
            case "ping_received":
                const { from, at } = payload;
                // const notification = `Ping from ${from.name} ${at}`;
                const notification = { from: from.name, at: at };
                //memberActions.pushNotification(notification);
                console.log(notification)
                break;
            default:
                console.log(`UNKNOWN EVENT RECEIVED ON ${topic}`, type, payload)
        }
    };

    const systemCallback = ({ topic, type, payload }) => {
        switch (type) {
            case "ping":
                console.log("System ping received")
                break;
            default:
                console.log(`UNKNOWN EVENT RECEIVED ON ${topic}`, type, payload)
        }
    };

    // Open/Close socket
    useEffect(() => {
        const socketOptions = {
            params: { token },
            logger: (kind, msg, data) => (
                // eslint-disable-next-line no-console
                console.log(`${kind}: ${msg}`, data)
            ),
        };
        openSocket(socketOptions);
        return () => closeSocket();
    }, []);

    // Join/Leave channels
    useEffect(() => {
        if (isConnected) {
            joinChannel("system", systemCallback);
            joinChannel(userTopic, userCallback);
        }
        return () => {
            leaveChannel("system");
            leaveChannel(userTopic);
        };
    }, [isConnected]);

    return (
        <div>
            <Signout />

            <h1>Webpack 5 with React</h1>
            <blockquote>Lorem ipsum dolores</blockquote>

            <div>Width: {width}, Height: {height}</div>

            <select value={user} onChange={e => console.log(e.target.value)}>
                <option>Mamita</option>
                <option>Fran</option>
                <option>Jason</option>
                <option>Koko</option>
            </select>

            <Clock size={150} theme={theme} />

            <ul>
                <li><a onClick={() => setFlash("Koko flash")}>Set Flash!</a></li>
                <li><a onClick={() => setShowModal(true)}>Show Modal!</a></li>
            </ul>

            
            <Router>
                <ul>
                    <li><Link to="/">Lobby</Link></li>
                    <li><Link to="/worlds">World</Link></li>
                </ul>

                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/">
                            <Lobby />
                        </Route>
                        <Route path="/worlds">
                            <World />
                        </Route>
                        <Route exact path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </Suspense>
            </Router>
            

            {
                showModal &&
                <Modal close={() => setShowModal(false)}>
                    <div>YO MODAL!</div>
                </Modal>
            }
        </div>
    )
}

export default Member;