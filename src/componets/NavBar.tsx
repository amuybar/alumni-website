import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineUser, AiOutlineBell, AiOutlineCalendar, AiOutlineMessage, AiOutlineQuestionCircle, AiOutlinePhone, AiOutlineProfile } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import '../styles/NavBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className='heading'>
                <img src="/s.png" alt="logo"/>
                <div className="line"></div>
                <h1>STAMMS</h1>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={`nav-links ${isOpen ? "active" : ""}`}>
                <li><input type="text" placeholder="Search" className="search-bar" /></li>
                <li><NavLink to="/"><AiOutlineHome /> Home</NavLink></li>
                <li><NavLink to="/sacco" onClick={toggleMenu}><AiOutlineUser /> Sacco</NavLink></li>
                <li><NavLink to="/opportunity" onClick={toggleMenu}><AiOutlineBell /> Opportunity</NavLink></li>
                <li><NavLink to="/impact" onClick={toggleMenu}><AiOutlineCalendar /> Impact</NavLink></li>
                <li><NavLink to="/news" onClick={toggleMenu}><AiOutlineMessage /> News</NavLink></li>
                <li><NavLink to="/events" onClick={toggleMenu}><AiOutlineCalendar /> Events</NavLink></li>
                <li><NavLink to="/get-involved" onClick={toggleMenu}><AiOutlineQuestionCircle /> Get Involved</NavLink></li>
                <li><NavLink to="/contact" onClick={toggleMenu}><AiOutlinePhone /> Contact</NavLink></li>
                <li><NavLink to="/profile" onClick={toggleMenu}><AiOutlineProfile /> Profile</NavLink></li>
               
            </ul>
        </nav>
    );
};

export default NavBar;
