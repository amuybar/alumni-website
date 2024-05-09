import React from 'react';
import '../styles/HeroSection.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate=useNavigate();
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h3>A new chapter at STAMMS</h3>
                <h1>Tackling the future together</h1>
                <button onClick={()=>navigate('/sacco')} >Explore Our Sacco</button>
            </div>
        </div>
    );
};

export default HeroSection;