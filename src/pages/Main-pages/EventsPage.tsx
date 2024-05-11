import React, { useEffect, useState } from 'react';
import { Event, User } from '../../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../../styles/EventsPage.css';
import { baseUrl, eventEndpoints, userEndpoints } from '../../Services/apis_endpoin';

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
    const fetchEvents = async () => {
      try {
        const response = await axios.get(baseUrl + eventEndpoints.getAllEvents);
        setEvents(response.data.events);
      } catch (error) {
        setError('An error occurred while fetching events.');
      }
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  function getNumberSuffix(date: number) {
    const lastDigit = date % 10;

    if (date >= 11 && date <= 19) {
      return 'th';
    }

    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  return (
    <div className="events-page">
      <div className='events-add'>
        <h1>Events</h1>
        {user?.isadmin? (
        <button onClick={() => navigate('/add-event-form')}>Add Event</button>
        
      ) : (
        <h2></h2>
      )}
       </div>
        
      {isLoading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => {
            const eventDate = new Date(event.date);
            const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(eventDate);
            const date = eventDate.getDate();
            const dateSuffix = getNumberSuffix(date);
            const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(eventDate);

            return (
              <li key={event.id} className="event-item">
                <div className="event-date">
                  <p>{dayName}</p>
                  <h3>{date}<sup>{dateSuffix}</sup></h3>
                  <p>{monthName}</p>
                </div>
                <div className='liner'></div>
                <div className='event-body'>
                  <h2 className="event-title">{event.title}</h2>
                  <p className="event-description">{event.description}</p>
                  <p className="event-location">{event.location}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default EventsPage;
