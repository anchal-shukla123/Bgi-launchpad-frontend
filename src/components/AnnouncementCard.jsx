import React, { useState } from 'react';
import '../styles/AnnouncementCard.css';

const AnnouncementCard = ({ announcement }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="announcement-card">
      <div className="card-header">
        <span className="department-tag">{announcement.department}</span>
        <span className="time-ago">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"/>
            <path fillRule="evenodd" d="M7.5 3a.5.5 0 01.5.5v4.793l2.146 2.147a.5.5 0 01-.708.708l-2.5-2.5A.5.5 0 017 8V3.5a.5.5 0 01.5-.5z"/>
          </svg>
          {announcement.time}
        </span>
      </div>

      <h2 className="announcement-title">{announcement.title}</h2>
      <p className="announcement-content">{announcement.content}</p>
      <p className="announcement-author">Posted by {announcement.author}</p>

      <div className="card-footer">
        <div className="stats">
          <span className="stat-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M9 2C5.686 2 3 4.686 3 8s2.686 6 6 6c.535 0 1.058-.073 1.56-.21l2.44 1.22V12.5c1.415-1.187 2-2.91 2-4.5 0-3.314-2.686-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
            </svg>
            {announcement.views} views
          </span>
          <button 
            className="stat-item clickable"
            onClick={() => setShowComments(!showComments)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M2 4a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2h-2.586l-2.707 2.707a1 1 0 01-1.414 0L4.586 13H4a2 2 0 01-2-2V4z"/>
            </svg>
            {announcement.comments} comments
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{marginLeft: '4px'}}>
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 01.708 0L6 8.293l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708z"/>
            </svg>
          </button>
        </div>
      </div>

      {announcement.poll && (
        <div className="poll-section">
          <h3 className="poll-question">{announcement.poll.question}</h3>
          {announcement.poll.options.map((option, index) => (
            <div key={index} className="poll-option">
              <div className="option-info">
                <span className="option-text">{option.text}</span>
                <span className="option-votes">{option.votes} votes</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${(option.votes / announcement.poll.totalVotes) * 100}%`}}
                />
              </div>
            </div>
          ))}
          <p className="total-votes">Total votes: {announcement.poll.totalVotes}</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;