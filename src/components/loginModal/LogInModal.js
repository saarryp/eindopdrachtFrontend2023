import React from 'react';
import { useForm } from 'react-hook-form';
import './LogInModal.css';
import '../../hooks/useLoginHook';
// import {AuthContext} from "../../context/AuthContext";
import useLoginHook from "../../hooks/useLoginHook";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const { handleSubmit, register } = useForm();
    const {logUserIn} = useLoginHook();



    // const [usernameError, setUsernameError] = useState('');
    // const [passwordError, setPasswordError] = useState('');

    const onSubmit = async (data) => {
        console.log(data)
        try {
            await logUserIn(data.username, data.password);
            onLogin();
            onClose();

        } catch (error) {
            console.error(error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (

        <div className="modal-content">
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="table-user"
                           {...register('username')}
                           placeholder="Username:"
                    />
                    <input className="table-pass"
                           {...register('password')}
                           type="password"
                           placeholder="Password:"
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   e.preventDefault();
                                   handleSubmit(onSubmit)();
                               }
                           }}
                    />
                    <button className="login-link"
                            type="submit"
                            >

                        Login
                    </button>
                </form>
                <button className="close-login-button" onClick={onClose}>
                    &times;
                </button>
                {/*<button className="close-button"*/}
                {/*        onClick={onClose}>*/}
                {/*    x*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default LoginModal;
