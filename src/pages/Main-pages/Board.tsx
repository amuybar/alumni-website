import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BoardPage.css';
import { Board } from '../../types';



const BoardPage = () => {
  const [boardMembers, setBoardMembers] = useState<Board[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const response = await axios.get('/api/board-members');
        setBoardMembers(response.data.boardMembers);
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

  return (
    <div className="board-page">
      <h1>Board Members</h1>
      <div className="board-members">
        {boardMembers.map((boardMember, index) => (
          <div className="board-member" key={index}>
            <img src={boardMember.picture} alt={boardMember.name} />
            <h2>{boardMember.name}</h2>
            <p>{boardMember.position}</p>
            <button>Contact</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;