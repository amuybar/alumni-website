import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineUser, AiOutlineBell, AiOutlineCalendar, AiOutlineMessage } from 'react-icons/ai';
import useFetchUserData from '../custom_hooks/useFetchHook';

import '../styles/NavBar.css';

const NavBar = () => {
  // State to handle menu open/close
  const [isOpen, setIsOpen] = useState(false);

  // Fetch user data using custom hook
  const { user } = useFetchUserData();

  // Get current location and navigate function from react-router-dom
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is admin
  const isAdmin = user && user.isadmin;

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when a nav link is clicked
  const handleNavLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  // Logout function
  const onLogout = () => {
    localStorage.removeItem('token');
    // Refresh window
    window.location.reload();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Heading with logo and title */}
      <div className='heading' onClick={()=>navigate('/')}>
        <img src="/s.png" alt="logo"/>
        <div className="line"></div>
        <h1>STAMMS</h1>
      </div>

      {/* Menu icon to toggle menu */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen? <FaTimes /> : <FaBars />}
      </div>

      {/* Nav links */}
      <ul className={`nav-links ${isOpen? "active" : ""}`}>
        <li><NavLink to="/" onClick={handleNavLinkClick}><AiOutlineHome /> Home</NavLink></li>
        <li><NavLink to="/sacco" onClick={handleNavLinkClick}><AiOutlineUser /> Sacco</NavLink></li>
        <li><NavLink to="/opportunity" onClick={handleNavLinkClick}><AiOutlineBell /> Gallery</NavLink></li>
        <li><NavLink to="/news" onClick={handleNavLinkClick}><AiOutlineMessage /> News</NavLink></li>
        <li><NavLink to="/events" onClick={handleNavLinkClick}><AiOutlineCalendar /> Events</NavLink></li>

        {/* Admin specific nav links */}
        {isAdmin? (
          <>
            <li><NavLink to="/manage-sacco" onClick={handleNavLinkClick}><AiOutlineCalendar /> Manage Sacco</NavLink></li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>

        ) : (
          <li><NavLink to="/profile" onClick={handleNavLinkClick}><AiOutlineCalendar /> Profile</NavLink></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;