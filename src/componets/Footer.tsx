import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="contact">
                <h3>Contact Us</h3>
                <p>Email: info@example.com</p>
                <p>Phone: +1234567890</p>
            </div>
            <div className="links">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Sacco</a></li>
                </ul>
            </div>
            <div className="social-media">
                <h3>Follow Us</h3>
                <div className="social-icons">
                    <img src="/fb.png" alt="Facebook" />
                    <img src="/x.png" alt="Twitter" />
                    <img src="/tiktok.png" alt="Tiktok" />
                   
                </div>
            </div>
            <div className="footer-text">
                <p>&copy; 2024 Alumni Association. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
