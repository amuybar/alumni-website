import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineUser, AiOutlineBell, AiOutlineCalendar, AiOutlineMessage } from 'react-icons/ai';
import useFetchUserData from '../custom_hooks/useFetchHook';

import '../styles/NavBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useFetchUserData();
    const location = useLocation();
    const navigate =useNavigate();

    const isAdmin = user && user.isadmin;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };
    const onLogout = () => {
        localStorage.removeItem('token');
        // refresh window
        window.location.reload();
        navigate('/login');
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
                <li><NavLink to="/" onClick={handleNavLinkClick}><AiOutlineHome /> Home</NavLink></li>
                <li><NavLink to="/sacco" onClick={handleNavLinkClick}><AiOutlineUser /> Sacco</NavLink></li>
                <li><NavLink to="/opportunity" onClick={handleNavLinkClick}><AiOutlineBell /> Opportunity</NavLink></li>
                <li><NavLink to="/news" onClick={handleNavLinkClick}><AiOutlineMessage /> News</NavLink></li>
                <li><NavLink to="/events" onClick={handleNavLinkClick}><AiOutlineCalendar /> Events</NavLink></li>
                
                {isAdmin ? (
                    <><li><NavLink to="/manage-sacco" onClick={handleNavLinkClick}><AiOutlineCalendar /> Manage Sacco</NavLink></li>
                    <li>
                    <button onClick={onLogout}>Logout</button></li></>

                ) : (
                    <li><NavLink to="/profile" onClick={handleNavLinkClick}><AiOutlineCalendar /> Profile</NavLink></li>
                    
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
