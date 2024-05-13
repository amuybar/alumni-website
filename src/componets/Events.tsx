import React, { useEffect, useState } from 'react';
import { Event } from '../types';
import axios from 'axios';
import { baseUrl, eventEndpoints } from '../Services/apis_endpoin';


import '../styles/EventSection.css';
import EventCard from '../custom_hooks/custom_eventcard';
import { useNavigate } from 'react-router-dom';

const EventSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await (await axios.get(baseUrl + eventEndpoints.getAllEvents)).data.events;
      setEvents(response);
    } catch (error) {
      setError(`${error}`)
    } finally {
      setIsLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchEvents();
  }, []);

  // Format date
  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return dateObject.toLocaleDateString('en-US', options);
  };
  

  return (
    <div className='event'>
    <h2>Events</h2>
    <div className="event-section">
      {isLoading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      <div className="event-section">

        {events.length > 0 &&
          events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              date={formatDate(event.date)}
              location={event.location} />
          ))}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
    <button onClick={()=>navigate('/events')}>View Events</button>
    </div>
  );
};

export default EventSection;