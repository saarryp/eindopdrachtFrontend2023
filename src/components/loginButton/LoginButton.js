// import React, { useState } from 'react';
// import './LoginButton.css';
// import { useForm } from 'react-hook-form';
//
// const ButtonLogIn = ({ onLogin }) => {
//     const [showLogInForm, setShowLogInForm] = useState(false);
//     const { handleSubmit, register } = useForm();
//
//     const toggleLogInForm = () => {
//         setShowLogInForm(!showLogInForm);
//     };
//
//     const onSubmit = async (data) => {
//         try {
//             //backend api hier
//             const response = await fetch('/api/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data),
//             });
//             if (response.ok) {
//                 const responseData = await response.json();
//                 onLogin(responseData.token);
//             } else {
//                 console.error('Login failed');
//             }
//         } catch (error) {
//             console.error('Error', error);
//         }
//     };
//
//     return (
//         <div>
//             {showLogInForm ? (
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <input {...register('username')} placeholder="Username" />
//                     <input {...register('password')} type="password" placeholder="Password" />
//                     <button className="button" type="submit">
//                         LOGIN
//                     </button>
//                 </form>
//             ) : (
//                 <button className="button" onClick={toggleLogInForm}>
//                     LOGIN
//                 </button>
//             )}
//         </div>
//     );
// };
//
// export default ButtonLogIn;

// ButtonLogIn.js
import React, { useState } from 'react';
import './LoginButton.css';
import LoginModal from '../../components/loginModal/LogInModal';

const ButtonLogIn = ({ onLogin }) => {
    const [modalOpen, setModalOpen] = useState(false);

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
