import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/NewsPage.css'
import { News, User } from '../../types';
import { baseUrl, newsEndpoints, userEndpoints } from '../../Services/apis_endpoin';
import { getUserFromStorage } from '../../Services/authService';

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
        if (!token) {
          return null; 
        }
          
        try {
          const response = await axios.get(baseUrl + userEndpoints.userProfile, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = response.data.user;
          setUser(userData)
            
         
        } catch (error) {
            console.error(error);
            return null;
          }

    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await axios.get(baseUrl + newsEndpoints.getAllNews);
        if (response.data && Array.isArray(response.data)) {
          setNewsItems(response.data);
        } else {
          setErrorMessage('No news items available.');
        }
      } catch (error) {
        if (!error) {
          setErrorMessage('Network Error. Please try again later.');
        } else {
          setErrorMessage('Something went wrong. Please try again later.');
        }
      }
    };

    fetchNewsItems();
  }, []);

  return (
    <div className="news-page">
      <h1>News</h1>
      {user?.isadmin? (
        <button className='post-button' onClick={() => console.log("Button clicked")}>Post News</button>
      ) : (
        <h2></h2>
      )}
      
      {newsItems.length === 0? (
        <p>No news items available.</p>
      ) : (
        <div className="news-items">
          {newsItems.map((newsItem, index) => (
            <div className="news-item" key={index}>
              <h2>{newsItem.heading}</h2>
              <p>{newsItem.summary}</p>
              <Link to={`/news/${newsItem.id}`}>Read more</Link>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default NewsPage;