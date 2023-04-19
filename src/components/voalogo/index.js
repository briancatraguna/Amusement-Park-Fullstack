import React from "react";
import './style.css';

const VoaLogo = ({className}) => {
    return (
        <div className={`logo-container ${className}`}>
            <img className="logo" src={require('./../../assets/voa-logo.png')}/>
            <p className="logo-text">Voyage of Amusements</p>
        </div>
    )
}

export default VoaLogo;