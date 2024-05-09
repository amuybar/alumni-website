import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/NewsPage.css'
import { News } from '../../types';


const NewsPage = () => {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await axios.get('/api/news');
        setNewsItems(response.data.newsItems);
      } catch (error) {
        if (!error) {
          setErrorMessage('Something went wrong. Please try again later.');
        } else {
          setErrorMessage(`${error}`);
        }
      }
    };

    fetchNewsItems();
  }, []);

  return (
    <div className="news-page">
      <h1>News</h1>
      <div className="news-items">
        {newsItems.map((newsItem, index) => (
          <div className="news-item" key={index}>
            <h2>{newsItem.heading}</h2>
            <p>{newsItem.summary}</p>
            <Link to={`/news/${newsItem.id}`}>Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;