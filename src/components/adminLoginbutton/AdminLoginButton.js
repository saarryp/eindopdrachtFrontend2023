import React, { useState } from 'react';
import './AdminLoginButton.css';
import AdminLoginModal from "../adminLoginModal/AdminLoginModal";

export default function AdminButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdminLogin = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <span className="admin-link" onClick={handleAdminLogin}>
                Admin Login
            </span>
            <AdminLoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}
