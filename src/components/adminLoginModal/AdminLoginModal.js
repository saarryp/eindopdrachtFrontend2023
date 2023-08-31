import React, { useState } from 'react';
import './AdminLoginModal.css';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function AdminLoginModal({ isOpen, onClose, onLogin }) {
    const {loginAdminFunction} = useState(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

        const handleLogin = async () => {
            try {
                // Send admin login request to the backend
                const response = await axios.post( `https://frontend-educational-backend.herokuapp.com/api/auth/signin`,
                    '',
                    {
                        username,
                        password,
                    }
                );

                if (response.data.success) {
                    // Call the loginAdminFunction to perform the admin login action
                    loginAdminFunction(response.data.adminData);
                    onClose();
                } else {
                    console.log('Admin login failed');
                }
            } catch (error) {
                console.error('Error during admin login:', error);
            }
        };

        if (!isOpen) {
            return null;
        }



    return (
        <div className="admin-login-modal">
            <div className="admin-login-content">
                <h2>Admin Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AdminLoginModal;
