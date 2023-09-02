import React from "react"
import "./WarningLimit.css";


function WarningLimit({ isOpen, onClose }) {


    return (
        <div className={`favorite-warning-modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content-warning">
                <h2>Warning Limit!</h2>
                <p>max 10 favorite songs.</p>
                <p>Delete songs in your page, before adding new tracks.</p>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default WarningLimit;

