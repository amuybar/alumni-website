import React, { useEffect, useState } from 'react';
import {Event} from '../../types'
import axios from 'axios';
import '../../styles/EventsPage.css'
import { useNavigate } from 'react-router-dom';


const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate=useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/event');
        setEvents(response.data);
      } catch (error) {
        setError('An error occurred while fetching events.');
      }
      setIsLoading(false);
    };

    fetchEvents();
  }, []);
  // function to get suffix of the date
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
       <button onClick={()=>navigate('/add-event-form')}>Add Event</button>
      </div>
      {isLoading? (
        <p>Loading events...</p>
      ) : error? (
        <p>{error}</p>
      ) : (
        <ul className="event-list">
  {events.map((event) => {
    // Parse the date string
    const eventDate = new Date(event.date);

    // Get day name (e.g., Monday)
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(eventDate);

    // Get date (e.g., 13th)
    const date = eventDate.getDate();
    const dateSuffix = getNumberSuffix(date); // Function to get suffix (e.g., 'th', 'st', 'nd', 'rd')

    // Get month name (e.g., March)
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(eventDate);

    return (
      <li key={event.id} className="event-item">
        <div className="event-date">
          <p>{dayName}</p>
          <h3>{date}
          <sup>{dateSuffix}</sup></h3>
           <p>{monthName}</p>
        </div>
        <div className='liner'></div>
       <div className='event-body'> <h2 className="event-title">{event.title}</h2>
        <p className="event-description">{event.description}</p>
        
        <p className="event-location">{event.location}</p></div>
      </li>
    );
  })}
</ul>

      )}
     
    </div>
  );
};

export default EventsPage;