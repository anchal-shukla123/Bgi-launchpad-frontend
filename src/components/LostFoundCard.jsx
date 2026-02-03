import React from 'react';
import '../styles/LostFoundCard.css';

const LostFoundCard = ({ item, onClaim, canClaim }) => {
  const getStatusInfo = (status) => {
    if (!status) return { class: 'lost', label: 'Lost' };
    const statusUpper = status.toUpperCase();
    
    switch(statusUpper) {
      case 'LOST':
        return { class: 'lost', label: 'Lost' };
      case 'FOUND':
        return { class: 'found', label: 'Found' };
      case 'CLAIMED':
        return { class: 'claimed', label: 'Claimed' };
      default:
        return { class: 'lost', label: 'Lost' };
    }
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    const days = Math.floor(seconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  const getExpiresIn = (expiresAt) => {
    if (!expiresAt) return '30 days';
    const expires = new Date(expiresAt);
    const now = new Date();
    const days = Math.floor((expires - now) / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Expired';
    if (days === 0) return 'Today';
    return `${days} days`;
  };

  const statusInfo = getStatusInfo(item.status);
  const isClaimed = item.status === 'CLAIMED';

  return (
    <div className="lost-found-card">
      {/* Header with gradient and 3D box */}
      <div className={`card-header-section ${statusInfo.class}`}>
        <div className="box-icon"></div>
      </div>

      {/* Card Body */}
      <div className="card-body-section">
        {/* Title and Status */}
        <div className="title-row">
          <h3 className="item-title">{item.itemName}</h3>
          <span className={`status-badge ${statusInfo.class}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Description */}
        <p className="item-description">{item.description}</p>

        {/* Details */}
        <div className="item-details">
          <div className="detail-item">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
              <path fillRule="evenodd" d="M4 8h12v8H4V8z" clipRule="evenodd"/>
            </svg>
            {item.category || 'Personal Items'}
          </div>

          <div className="detail-item">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            {item.location || 'Campus'}
          </div>

          <div className="detail-item">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            {getTimeAgo(item.reportedAt)} • Expires in {getExpiresIn(item.expiresAt)}
          </div>
        </div>

        {/* Posted By */}
        <p className="posted-by">
          Posted by {item.userName || 'Anonymous'}
        </p>

        {/* Contact Button */}
        <button
          className={`contact-button ${isClaimed ? 'claimed' : ''}`}
          onClick={() => !isClaimed && onClaim && canClaim && onClaim(item.id)}
          disabled={isClaimed || !canClaim}
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
          {isClaimed ? 'Claimed' : 'Contact'}
        </button>
      </div>
    </div>
  );
};

export default LostFoundCard;