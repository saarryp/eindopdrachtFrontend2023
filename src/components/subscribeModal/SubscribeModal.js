import React, {useState} from 'react';
import './SubscribeModal.css';
import {useSubscribeHook} from "../../hooks/useSubscribeHook";
import {useNavigate} from "react-router-dom";

const SubscribeModal = ({closeModal, role}) => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState(role)
    const [isStillLoading, setIsStillLoading] = useState(false);
    const {subscribe, error, isSubscribed} = useSubscribeHook();

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsStillLoading(true)


        await subscribe(username, email, password, selectedRole);
        setIsStillLoading(false)

        if (isSubscribed) {
            navigate('/')
        }
    }

    return (
        <>
            <div className="subscribe-modal">
                <div className="modal-subscribe-content">
                 <span className="close-subscribe-button" onClick={closeModal}>
                    &times;
                </span>
                    <form onSubmit={handleSubmit} className="subscription-form">
                        <input
                            type="text"
                            placeholder="Username:"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                            className="username-box"
                        />
                        <input
                            type="text"
                            placeholder="Email:"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="email-box"
                        />
                        <input
                            type="password"
                            placeholder="Password:"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="password-box"
                        />
                        <button
                            type="submit"
                            className={`subscription-box ${isSubscribed ? 'subscribed' : ''}`}
                            disabled={isSubscribed}>
                            {isStillLoading ? 'Loading...' : isSubscribed ? 'Welcome!  Your registration has been successfully completed. You can log in now.' : 'Register'}
                            {error && <div className="error-message">{error}</div>}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SubscribeModal;