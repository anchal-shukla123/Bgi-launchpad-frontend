import React, { useState } from 'react';
import '../styles/AnnouncementCard.css';

const AnnouncementCard = ({ announcement, onDelete }) => {
  const [showComments, setShowComments] = useState(false);

  // Format time ago
  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  // Get department name
  const getDepartmentName = (deptId) => {
    const deptMap = {
      1: 'Computer Science',
      2: 'Mechanical',
      3: 'Electrical',
      4: 'Civil'
    };
    return deptMap[deptId] || (deptId ? 'All Departments' : 'General');
  };

  return (
    <div className="announcement-card">
      <div className="card-header">
        <span className="department-tag">
          {getDepartmentName(announcement.departmentId)}
        </span>
        <span className="time-ago">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"/>
            <path fillRule="evenodd" d="M7.5 3a.5.5 0 01.5.5v4.793l2.146 2.147a.5.5 0 01-.708.708l-2.5-2.5A.5.5 0 017 8V3.5a.5.5 0 01.5-.5z"/>
          </svg>
          {getTimeAgo(announcement.createdAt)}
        </span>
      </div>

      <h2 className="announcement-title">{announcement.title}</h2>
      <p className="announcement-content">{announcement.description}</p>

      <div className="card-footer">
        <div className="stats">
          <span className="stat-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M9 2C5.686 2 3 4.686 3 8s2.686 6 6 6c.535 0 1.058-.073 1.56-.21l2.44 1.22V12.5c1.415-1.187 2-2.91 2-4.5 0-3.314-2.686-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
            </svg>
            {announcement.viewCount || 0} views
          </span>
          <span className="stat-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M2 4a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2h-2.586l-2.707 2.707a1 1 0 01-1.414 0L4.586 13H4a2 2 0 01-2-2V4z"/>
            </svg>
            {announcement.commentCount || 0} comments
          </span>
        </div>

        {onDelete && (
          <button 
            className="btn-delete" 
            onClick={() => onDelete(announcement.id)}
            title="Delete announcement"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        )}
      </div>

      {announcement.hasPoll && (
        <div className="poll-section">
          <p className="poll-indicator">📊 This announcement includes a poll</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;