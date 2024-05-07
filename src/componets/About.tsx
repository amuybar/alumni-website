import React from 'react';
import '../styles/AboutSection.css';

const AboutSection = () => {
    return (
        <div className="about-section">
            <div className="about-content">
                <h1>About Our Alumni</h1>
                <h3>Connecting Past, Present, and Future</h3>
                <p>
                    Welcome to the STAMMS Alumni Association and Sacco website! We are a community of alumni from the St Augastin Mlimani Secondary School (STAMSS) program. Our mission is to foster connections, provide opportunities, and empower our members to thrive in their personal and professional lives.
                </p>
                <button className="learn-more-btn">Learn More</button>
            </div>
        </div>
    );
};

export default AboutSection;
