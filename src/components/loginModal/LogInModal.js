import React, {useContext} from 'react';
import {useForm} from 'react-hook-form';
import './LogInModal.css';
import '../../hooks/useLoginHook';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

const LoginModal = ({isOpen, onClose, onLogin}) => {
        const {handleSubmit, register} = useForm();
        const { loginFunction } = useContext(AuthContext);

        const onSubmit = async (data) => {
            console.log(data);

            try {
                const response = await axios.post(
                    'https://frontend-educational-backend.herokuapp.com/api/auth/signin',
                    {
                        username: data.username,
                        password: data.password,

                    }
                );

                console.log(response);
                loginFunction(response.data);
            } catch (e) {
                console.error(e)
            }
            onClose();
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
