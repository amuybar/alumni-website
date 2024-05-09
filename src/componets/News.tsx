import React from 'react';
import '../styles/NewsSection.css';
import { useNavigate } from 'react-router-dom';

const NewsSection = () => {
    const newsList = [
        "2024 March Meeting ",
        "STAMSS perfomance",
        "Stamms Sports bulletin",
    ];

    const navigate = useNavigate();

    return (

        <div className="news-section">
            <h1>STAMSS News and Features</h1>
            <ul className="news-list">
              <div className="news-scroll-container"> 
                 {newsList.map((news, index) => (
                   <div key={index}     className="news-card"> 
                <img src="/image.png" alt="image" />
                <li>{news}</li>
               </div>
              ))}
               </div>
            </ul>

            <button onClick={()=>navigate('/news')} className="check-all-news-btn">Check All News</button>
        </div>
    );
};

export default NewsSection;
