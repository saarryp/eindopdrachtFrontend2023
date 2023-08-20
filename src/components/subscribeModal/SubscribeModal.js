import React from 'react';
import './SubscribeModal.css';

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

    return (
        <div className="subscribe-modal">
            <div className="modal-subscribe-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
                <form className="subscription-form">
                    <input type="text" placeholder="Username:" className="username-box"/>
                    <input type="email" placeholder="Email:" className="email-box" />
                    <input type="password" placeholder="Password:" className="password-box"/>
                    <button type="submit" className="subscription-box">Subscribe</button>
                </form>
            </div>
        </div>
    );
}

export default SubscribeModal;