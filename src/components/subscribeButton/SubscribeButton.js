import React, {useState} from 'react';
import './SubscribeButton.css';
import SubscribeModal from '../../components/subscribeModal/SubscribeModal'


    const SubscribeButton = () => {
        const [modalOpen, setModalOpen] = useState(false);

        const openModal = () => {
            console.log('opening modal')
            setModalOpen(true);
        }


    return (
            <div className="container-subscribe-button">
                <button
                    onClick={openModal}
                    className={`subscribe-button ${modalOpen ? 'active' : ''}`}
                >
                   Register
                </button>
                {modalOpen && <SubscribeModal role={["user"]} closeModal={() => setModalOpen(false)} />}
            </div>
        );
    };


export default SubscribeButton