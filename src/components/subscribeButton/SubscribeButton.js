import React from 'react';
import './SubscribeButton.css';


    const SubscribeButton = ({text, onClick}) => {
    return (
        <button className="subscribe-button" onClick={onClick}>
            SUBSCRIBE
        </button>
    );
}

export default SubscribeButton