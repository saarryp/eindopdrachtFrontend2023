import React from 'react';
import { useForm } from 'react-hook-form';
import './LogInModal.css'
const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const { handleSubmit, register } = useForm();

    const onSubmit = async (data) => {
        try {
            // Call your backend API here for authentication
            // ...

            // Close the modal after successful login
            onClose();
        } catch (error) {
            console.error('Error:', error);
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
                            type="submit">
                        Login
                    </button>
                </form>
                <button className="close-button"
                        onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
