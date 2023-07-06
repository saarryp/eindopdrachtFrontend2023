import React from 'react';
import './LoginButton.css';

const ButtonLogIn =({ text, onClick}) => {
    return (
        <button className="button" onClick={onClick}>
        LOGIN
        </button>
    );
}

export default ButtonLogIn