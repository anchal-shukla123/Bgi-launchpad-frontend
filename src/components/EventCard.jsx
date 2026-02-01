import React from 'react';
import '../styles/EventCard.css';

const EventCard = ({ event }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case 'Upcoming': return 'status-upcoming';
      case 'Ongoing': return 'status-ongoing';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="event-card">
      <div className="event-image">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect width="80" height="80" rx="8" fill="url(#gradient)"/>
          <rect x="25" y="30" width="30" height="20" rx="2" fill="white" opacity="0.3"/>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="80" y2="80">
              <stop offset="0%" stopColor="#667eea"/>
              <stop offset="100%" stopColor="#764ba2"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="event-content">
        <div className="event-header">
          <h3 className="event-title">{event.title}</h3>
          <span className={`status-badge ${getStatusClass(event.status)}`}>
            {event.status}
          </span>
        </div>

        <p className="event-description">{event.description}</p>

        <div className="event-details">
          <div className="detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.5 2a.5.5 0 00-.5.5v1h8v-1a.5.5 0 00-1 0v-.5h-6v.5a.5.5 0 00-1 0zM3 5h10a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z"/>
            </svg>
            <span>{event.date}</span>
          </div>

          <div className="detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"/>
              <path fillRule="evenodd" d="M7.5 3a.5.5 0 01.5.5v4.793l2.146 2.147a.5.5 0 01-.708.708l-2.5-2.5A.5.5 0 017 10V3.5a.5.5 0 01.5-.5z"/>
            </svg>
            <span>{event.time}</span>
          </div>

          <div className="detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 1a3 3 0 013 3v1h1a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h1V4a3 3 0 013-3z"/>
            </svg>
            <span>{event.venue}</span>
          </div>

          <div className="detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM12.93 12c-.35-.51-.93-1-1.93-1H5c-1 0-1.58.49-1.93 1C3.02 12.17 3 12.33 3 12.5V14h10v-1.5c0-.17-.02-.33-.07-.5z"/>
            </svg>
            <span>{event.organizer}</span>
          </div>

          <div className="detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M7 8a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm-2 .5c-2.5 0-4.5 1.5-4.5 3.5V14h9v-2c0-2-2-3.5-4.5-3.5z"/>
              <path d="M13.5 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm1 7.5c-1.39 0-2.5.84-2.5 1.88V13h5v-1.62c0-1.04-1.11-1.88-2.5-1.88z"/>
            </svg>
            <span>{event.registered} registered</span>
          </div>
        </div>

        <div className="event-actions">
          {event.status !== 'Completed' && (
            <button className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 1a5 5 0 110 10A5 5 0 018 3z"/>
                <path d="M10.854 7.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L9.293 8 7.146 5.854a.5.5 0 11.708-.708l3 3z"/>
              </svg>
              Register
            </button>
          )}
          <button className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.5 2a.5.5 0 00-.5.5v1h8v-1a.5.5 0 00-1 0v-.5h-6v.5a.5.5 0 00-1 0zM3 5h10a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z"/>
            </svg>
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;