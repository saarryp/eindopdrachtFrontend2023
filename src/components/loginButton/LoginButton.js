import React, {useState} from 'react';
import './LoginButton.css';
import LoginModal from '../../components/loginModal/LogInModal';


const ButtonLogIn = ({onLogin}) => {
    const [modalOpen, setModalOpen] = useState(false);


    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <button className="login-button" type = "submit" onClick={openModal}>
                Login
            </button>
            <LoginModal isOpen={modalOpen} onClose={closeModal} onLogin={onLogin}/>
        </div>
    );
};

export default ButtonLogIn;
