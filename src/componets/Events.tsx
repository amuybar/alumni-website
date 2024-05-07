import React from 'react';
import '../styles/EventSection.css';

const EventSection = () => {
    return (
        <div className="event-section">
            <div className="event">
                <div className="event-date">
                    <div className="date">
                        <span className="month">May</span>
                        <span className="date">07</span>
                        <span className="day">Sat</span>
                    </div>
                    <div className="line"></div>
                    <div className="title-location">
                        <h3 className="event-title">Google Meet AGM</h3>
                        <p className="event-location">Live(remote)</p>
                    </div>
                </div>
            </div>
            <button className="view-events-btn">View All Events</button>
        </div>
    );
};

export default EventSection;
