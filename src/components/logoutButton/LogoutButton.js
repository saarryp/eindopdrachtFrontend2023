import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import './LogoutButton.css';

function LogoutButton() {
    const {logoutFunction} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutFunction();
        navigate('/');
    };

    return (
        <div className="position-button">
            <button onClick={handleLogout} type = "button" className="button-logout">
                Logout
            </button>
        </div>
    );
}

export default LogoutButton;
