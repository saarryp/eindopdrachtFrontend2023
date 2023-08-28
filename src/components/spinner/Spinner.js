import React from "react";
import "./Spinner.css";
import spinnerImage from '../../assets/recordvoorspinner.png'

const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner-border">
        <img src={spinnerImage} alt="Loading" className="spinner-image"/>
        </div>
        </div>


    );
};

export default Spinner;


//oude code van spinner zonder plaatje const Spinner = () => {
//     return (
//          <div className="spinner-container">
//             <div className="spinner"></div>
//         </div>
//     );
// }; met ccs .spinner {
//     border: 4px solid #B89437;
//     border-top: 4px solid #F4E3B6;
//     border-radius: 50%;
//     width: 100px;
//     height: 100px;
//     animation: spin 2s linear infinite;
// }