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


