import React from 'react';
import '../styles/SocialsSection.css';

const SocialsSection = () => {
    return (
        <div className="socials-section">
            <h1>Connect with Alumni</h1>
            <p className="socials-description">
                Join our community on Discord channels, Facebook groups, Meet, WhatsApp groups, and explore the Alumni community!
            </p>
            <div className="socials-buttons">
                
                <button className="facebook-btn">Join Facebook</button>
                <button className="meet-btn">Join Meet</button>
                <button className="whatsapp-btn">Join WhatsApp</button>
                
            </div>
        </div>
    );
};

export default SocialsSection;
