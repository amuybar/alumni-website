import React from 'react';
import '../styles/Event_card.css'

interface EventCardProps {
  title: string;
  description: string;
  date:string;
  location:string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description,date,location }) => {
  return (
    <div className="event-card">
      <div className="event-card-content">
        <h3 className="event-card-title">{title}</h3>
        <p className="event-card-description">{description}</p>
        <p className="event-card-date">{date}</p>
        <p className="event-card-location">{location}</p>
     
      </div>
    </div>
  );
};

export default EventCard;