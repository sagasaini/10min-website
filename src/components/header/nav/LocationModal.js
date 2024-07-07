import React from 'react';
import './LocationModal.css';

const LocationModal = ({ closeModal }) => {
    return (
        <div className="location-modal-overlay">
            <div className="location-modal">
                <button style={{color:'black'}} className="close-button" onClick={closeModal}>X</button>
                <h3>Change Location</h3>
                <div className="location-modal-content">
                    <button className="detect-location-button">Detect my location</button>
                    <span className="or-text">OR</span>
                    <input type="text" placeholder="search delivery location" className="location-input" />
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
