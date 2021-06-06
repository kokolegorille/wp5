import React, { useEffect, useState } from "react";

import useWindowSize from "../hooks/useWindowSize";
import useLocalStorage from "../hooks/useLocalStorage";

import Clock from "../components/Clock";
import Modal from "../components/Modal";

import Api from "../services/Api";

const Demo = () => {
    const { width, height } = useWindowSize();
    const [user, setUser] = useLocalStorage("user", "Koko");

    const [showModal, setShowModal] = useState(null);

    useEffect(() => {
        Api.signin({ name: "admin", password: "secret" }),
            Api.signup({ name: "koko", password: "secret", email: "kokolegorille@gmail.com" })
    }, []);

    return (
        <div>
            <h1>Webpack 5 with React</h1>
            <blockquote>Lorem ipsum dolores</blockquote>

            <div>Width: {width}, Height: {height}</div>

            <select value={user} onChange={e => setUser(e.target.value)}>
                <option>Mamita</option>
                <option>Fran</option>
                <option>Jason</option>
                <option>Koko</option>
            </select>

            <Clock size={150} />

            <a onClick={() => setShowModal(true)}>Show Modal!</a>

            {
                showModal &&
                <Modal close={() => setShowModal(false)}>
                    <div>YO MODAL!</div>
                </Modal>
            }
        </div>
    )
}

export default Demo;