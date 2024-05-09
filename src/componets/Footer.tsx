import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="contact">
                <h3>Contact Us</h3>
                <p>Email: coterie@stamss.com</p>
                <p>Phone: +1234567890</p>
            </div>
            <div className="links">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/events">Events</a></li>
                    <li><a href="/news">News</a></li>
                    <li><a href="/sacco">Sacco</a></li>
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
                <p>&copy; 2024 Developed By <a href='https://www.amuyunzubarrac.club'>
                Barrack Amuyunzu</a>.</p>
            </div>
        </footer>
    );
};

export default Footer;
