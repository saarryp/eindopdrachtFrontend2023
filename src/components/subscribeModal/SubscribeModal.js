import React, {useContext, useState} from 'react';
import './SubscribeModal.css';
import {AuthContext} from "../../context/AuthContext";
import {useSubscribeHook} from "../../hooks/useSubscribeHook";

// const SubscribeModal = ({isOpen, onClose, onSubscribe}) => {
//     const [modalOpen, setModalOpen] = useState(false)
//     const [username, setUserName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     // const [userRole,setUserRole] = useState();
//
//     const openModal = () => {
//         setModalOpen(true);
//     };
//
//     const closeModal = () => {
//         setModalOpen(false);
//     }
//
//     const handleSubscribe = () => {
//         const userData = {
//             username,
//             email,
//             password,
//             // userRole
//         };
//         onSubscribe(userData)
//         onClose();
//     };
//
//     console.log(handleSubscribe)
//
//      return (
//             <div className="subscribe-modal">
//                 <h2>Subscribe</h2>
//                 <label>
//                     Username:
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUserName(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     Email:
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     Password:
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </label>
//                 <div className="modal-buttons">
//                     <button
//                         onClick={handleSubscribe}>Subscribe
//                     </button>
//                     <button
//                         onClick={onClose}>Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     ) : null;
// };
//
//



const SubscribeModal = ({closeModal}) => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {subscribe, error, isLoading} = useSubscribeHook();

    const handleSubmit = async (e) => {
        e.preventDefault()

        //
        await subscribe(username, email, password)
    }

    // const {username} = useContext(AuthContext);



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
                        type="email"
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
                        className="subscription-box">
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