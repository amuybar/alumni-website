import React from 'react';
import '../styles/SocialsSection.css';
import { useNavigate } from 'react-router-dom';

const SocialsSection = () => {
    const navigate=useNavigate();
    const naviagteToFacebook=()=>{
        window.open("https://www.facebook.com/groups/100000000000000", "_blank");
    };
    const naviagteToWhatsapp=()=>{
        window.open("https://chat.whatsapp.com/", "_blank");
    };
    return (
        <div className="socials-section">
            <h1>Connect with Alumni</h1>
            <p className="socials-description">
                Join our community on Discord channels, Facebook groups, Meet, WhatsApp groups, and explore the Alumni community!
            </p>
            <div className="socials-buttons">
                
                <button onClick={naviagteToFacebook} className="facebook-btn">Join Facebook</button>
                <button onClick={()=>navigate('/meet')}  className="meet-btn">Join Meet</button>
                <button onClick={naviagteToWhatsapp}  className="whatsapp-btn">Join WhatsApp</button>
                
            </div>
        </div>
    );
};

export default SocialsSection;
