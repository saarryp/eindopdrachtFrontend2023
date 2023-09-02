import React, {useState} from "react";
import SubscribeModal from "../../components/subscribeModal/SubscribeModal";
import "./AdminPage.css";

function AdminLoginPage() {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        console.log('opening modal')
        setModalOpen(true);
    }

    return (

        <div className="container-admin">
            <div className="center-button">
            <button
                onClick={openModal}
                className={`subscribe-button ${modalOpen ? 'active' : ''}`}
            >
               Admin Register
            </button>
            </div>
            {modalOpen && <SubscribeModal role={["admin"]} closeModal={() => setModalOpen(false)} />}
        </div>
    );
}
export default AdminLoginPage