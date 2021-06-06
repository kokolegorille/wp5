import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ close, children }) => {
    return createPortal(
        <div className="modal-overlay">
            <div className="modal-wrap">
                <span
                    className="close"
                    onClick={close}>
                    &times;
                </span>
                {children}
            </div>
        </div>,
        document.querySelector("#modal-root")
    )
};

export default Modal;