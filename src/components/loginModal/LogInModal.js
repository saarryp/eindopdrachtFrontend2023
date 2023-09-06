import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import './LogInModal.css';
import '../../hooks/useLoginHook';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

const LoginModal = ({isOpen, onClose, onLogin}) => {
        const {handleSubmit, register} = useForm();
        const {loginFunction} = useContext(AuthContext)
        const [errormessage, setErrorMessage] = useState('');

        const onSubmit = async (data) => {
            try {
                const response = await axios.post(
                    'https://frontend-educational-backend.herokuapp.com/api/auth/signin',
                    {
                        username: data.username,
                        password: data.password,

                    }
                );
                loginFunction(response.data);
                setErrorMessage('');

                onClose()
            } catch (e) {
                console.error(e)
                setErrorMessage("Incorrect username or password. Please try again.");
            }
        }

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
                        />
                        <button className="login-link" type="submit">
                            Login
                        </button>
                        {errormessage && <p className="error-message-login">{errormessage}</p>}
                    </form>
                    <button className="close-login-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
            </div>
        );
    }
;

export default LoginModal;
