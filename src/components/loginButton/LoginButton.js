// ButtonLogIn.js
import React, { useState } from 'react';
import './LoginButton.css';
import LoginModal from '../../components/loginModal/LogInModal';
// import useLoginHook from '../../hooks/useLoginHook';


const ButtonLogIn = ({ onLogin }) => {
    const [modalOpen, setModalOpen] = useState(false);
    // const {logUserIn} = useLoginHook;

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <button className="login-button" onClick={openModal}>
                Login
            </button>
            <LoginModal isOpen={modalOpen} onClose={closeModal} onLogin={onLogin}  />
        </div>
    );
};

export default ButtonLogIn;
