import React, {useContext, useState} from 'react';
import './SubscribeModal.css';
import {AuthContext} from "../../context/AuthContext";
import {useSubscribeHook} from "../../hooks/useSubscribeHook";

const SubscribeModal = ({closeModal}) => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {subscribe, error} = useSubscribeHook();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await subscribe(username, email, password, ['user']);
        setIsLoading(false)
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
                    {error && error.includes("Username") && <p className="error-message">{error}</p>}
                    <input
                        type="email"
                        placeholder="Email:"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="email-box"
                    />
                    {error && error.includes("email") && <p className="error-message">{error}</p>}
                    <input
                        type="password"
                        placeholder="Password:"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="password-box"
                    />
                    <button
                        type="submit"
                        className="subscription-box"
                    >
                        {error && <div className= "error">{error}</div> }
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}

export default SubscribeModal;