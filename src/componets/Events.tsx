import React, { useEffect, useState } from 'react';
import '../styles/EventSection.css';
import { useNavigate } from 'react-router-dom';
import { Event } from '../types';
import axios from 'axios';
import { baseUrl, eventEndpoints } from '../Services/apis_endpoin';



const EventSection = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(baseUrl+eventEndpoints.getAllEvents);
        if (response.data.length > 0) {
            const sortedEvents = response.data.sort(
                (a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime()
              );
          setEvent(sortedEvents[0]); // Set the latest event
        } else {
          setError('No events found.');
        }
      } catch (error) {
        setError('An error occurred while fetching events.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-section">
      {isLoading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {event && ( // Only render if event data is available
        <div className="event">
          <div className="event-date">
            <div className="date-section">
              <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
              <span className="date">{new Date(event.date).getDate()}</span>
              <span className="day">{new Date(event.date).toLocaleString('default', { weekday: 'short' })}</span>
            </div>
            <div className="line"></div>
            <div className="title-location">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-location">{event.location}</p>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => navigate('/events')} className="view-events-btn">
        View All Events
      </button>
    </div>
  );
};

export default EventSection;
