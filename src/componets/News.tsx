import React from 'react';
import '../styles/NewsSection.css';

const NewsSection = () => {
    const newsList = [
        "2024 March Meeting ",
        "STAMSS perfomance",
        "Stamms Sports bulletin",
        // Add more news titles as needed
    ];

    return (
        <div className="news-section">
            <h1>STAMSS News and Features</h1>
            <ul className="news-list">
                {newsList.map((news, index) => (
                    <li key={index}>{news}</li>
                ))}
            </ul>
            <button className="check-all-news-btn">Check All News</button>
        </div>
    );
};

export default NewsSection;
