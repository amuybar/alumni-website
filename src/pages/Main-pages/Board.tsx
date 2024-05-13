import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BoardPage.css';
import {  User } from '../../types';
import { baseUrl, userEndpoints } from '../../Services/apis_endpoin';
import useFetchUserData from '../../custom_hooks/useFetchHook';
import { useNavigate } from 'react-router-dom';
import ContactPopup from '../../componets/contactPopup';

const BoardPage = () => {
  const [boardMembers, setBoardMembers] = useState<User[]>([]);
  const [allMembers, setAllMembers] = useState<User[]>([]);
  const [selectedTab, setSelectedTab] = useState('boardMembers');
  const [errorMessage, setErrorMessage] = useState('');
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User|null>(null);
  const { user } = useFetchUserData();
  const [token] = useState(localStorage.getItem('token'));
  const isAdmin = user && user.isadmin;
  const navigate=useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[ [token, history]])


  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const response = await axios.get(baseUrl + userEndpoints.getAllUsers);
        const allUsers = response.data.users;
        const boardMembers = allUsers.filter((user: { isadmin: boolean }) => user.isadmin === true);
        setBoardMembers(boardMembers);
        setAllMembers(allUsers);
      } catch (error) {
        if (!error) {
          setErrorMessage('Something went wrong. Please try again later.');
        } else {
          setErrorMessage(`${error}`);
        }
      }
    };

    fetchBoardMembers();
  }, []);

  const handleContactButtonClick = (user:User) => {
    setSelectedUser(user); 
    setShowContactPopup(true); 
  };

  // Function to close the contact popup
  const handleCloseContactPopup = () => {
    setShowContactPopup(false);
  };
  // close the popup  when clicking outside
  const handleOutsideClick = (event: any) => {
    if (event.target.className === 'contact-popup') {
      handleCloseContactPopup();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  

  return (
    <div className="board-page">
      <h1>Board Members</h1>
      <div className="tabs">
        <button onClick={() => setSelectedTab('boardMembers')}>Board Members</button>
        {
          isAdmin?(
            <button onClick={() => setSelectedTab('allMembers')}>All Members</button>
          ):(
            null
          )
        }
      </div>
      {isAdmin?(
        <div className="board-members">
        {selectedTab === 'boardMembers' && (
          <>
            {boardMembers.map((boardMember, index) => (
              <div className="board-member" key={index}>
                <div className='Profile'>{boardMember.name[0]+boardMember.name[1]}</div>
                <h2>{boardMember.name}</h2>
                {
                  boardMember.isadmin === true? (
                    <button>Remove Admin</button>
                  ) : (
                    <button onClick={() => handleContactButtonClick(boardMember)}>Contact</button>
                  )
                }
              </div>
            ))}
          </>
        )}
        {selectedTab === 'allMembers' && (
          <>
            {allMembers.map((allMember, index) => (
              <div className="board-member" key={index}>
                <div className='Profile'>{allMember.name[0]+allMember.name[1]}</div>
                <h2>{allMember.name}</h2>
                {
                  allMember.isadmin === true? (
                    null
                  ) : (
                    <><button onClick={() => handleContactButtonClick(allMember)}>Contact</button><button>Make Admin</button></>

                  )
                }
              </div>
            ))}
          </>
        )}
      </div>
      ):(
        <>
            {boardMembers.map((boardMember, index) => (
              <div className="board-member" key={index}>
                <div className='Profile'>{boardMember.name[0]+boardMember.name[1]}</div>
                <h2>{boardMember.name}</h2>
                
                    <button onClick={() => handleContactButtonClick(boardMember)}>Contact</button>
                  
              </div>
            ))}
          </>
      )

      }
      
      {errorMessage && <p className="error">{errorMessage}</p>}
      {showContactPopup && (
        <ContactPopup isOpen={showContactPopup} onClose={handleCloseContactPopup} user={selectedUser!=null?selectedUser:undefined} />
      )}
    </div>
  );
};

export default BoardPage;

