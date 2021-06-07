import React, { useState } from "react";

import useWindowSize from "../hooks/useWindowSize";
import useLocalStorage from "../hooks/useLocalStorage";
import { 
    useFlash,
    useTheme
} from "../hooks/useApp";

import Clock from "../components/Clock";
import Modal from "../components/Modal";
import Signout from "../components/Signout";

const Member = () => {
    const { width, height } = useWindowSize();
    const [user, setUser] = useLocalStorage("user", "Koko");

    const [showModal, setShowModal] = useState(null);

    const [theme] = useTheme();
    const [_, setFlash] = useFlash();

    return (
        <div>
            <h1>Webpack 5 with React</h1>
            <blockquote>Lorem ipsum dolores</blockquote>

            <Signout />

            <div>Width: {width}, Height: {height}</div>

            <select value={user} onChange={e => setUser(e.target.value)}>
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