import React from 'react';
import '../styles/EventCard.css';

const EventCard = ({ event, onRegister, onDelete, registering }) => {
  const getStatusClass = (status) => {
    if (!status) return 'status-upcoming';
    switch(status.toLowerCase()) {
      case 'upcoming': return 'status-upcoming';
      case 'ongoing': return 'status-ongoing';
      case 'completed': return 'status-completed';
      default: return 'status-upcoming';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (startTime, endTime) => {
    if (!startTime) return 'TBA';
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : null;
    
    const startStr = start.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    if (end) {
      const endStr = end.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      return `${startStr} - ${endStr}`;
    }
    
    return startStr;
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
            {event.status || 'Upcoming'}
          </span>
        </div>

        <p className="event-description">{event.description}</p>

        <div className="event-details">
          <div className="detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.5 2a.5.5 0 00-.5.5v1h8v-1a.5.5 0 00-1 0v-.5h-6v.5a.5.5 0 00-1 0zM3 5h10a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z"/>
            </svg>
            <span>{formatDate(event.eventDate)}</span>
          </div>

          <div className="detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"/>
              <path fillRule="evenodd" d="M7.5 3a.5.5 0 01.5.5v4.793l2.146 2.147a.5.5 0 01-.708.708l-2.5-2.5A.5.5 0 017 10V3.5a.5.5 0 01.5-.5z"/>
            </svg>
            <span>{formatTime(event.startTime, event.endTime)}</span>
          </div>

          <div className="detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 1a3 3 0 013 3v1h1a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h1V4a3 3 0 013-3z"/>
            </svg>
            <span>{event.venue || 'TBA'}</span>
          </div>

          {event.maxParticipants && (
            <div className="detail-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7 8a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm-2 .5c-2.5 0-4.5 1.5-4.5 3.5V14h9v-2c0-2-2-3.5-4.5-3.5z"/>
                <path d="M13.5 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm1 7.5c-1.39 0-2.5.84-2.5 1.88V13h5v-1.62c0-1.04-1.11-1.88-2.5-1.88z"/>
              </svg>
              <span>{event.currentParticipants || 0} / {event.maxParticipants} registered</span>
            </div>
          )}
        </div>

        <div className="event-actions">
          {event.status !== 'COMPLETED' && event.status !== 'Completed' && onRegister && (
            <button 
              className="btn-primary"
              onClick={() => onRegister(event.id)}
              disabled={registering}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 1a5 5 0 110 10A5 5 0 018 3z"/>
                <path d="M10.854 7.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L9.293 8 7.146 5.854a.5.5 0 11.708-.708l3 3z"/>
              </svg>
              {registering ? 'Registering...' : 'Register'}
            </button>
          )}
          
          {onDelete && (
            <button 
              className="btn-delete"
              onClick={() => onDelete(event.id)}
              title="Delete event"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;