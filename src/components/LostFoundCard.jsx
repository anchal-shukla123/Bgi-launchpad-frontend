import React from 'react';
import '../styles/LostFoundCard.css';

const LostFoundCard = ({ item }) => {
  return (
    <div className="lost-found-card">
      <div className="card-image" style={{background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`}}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect x="15" y="20" width="30" height="25" rx="3" fill="white" opacity="0.3"/>
          <rect x="20" y="25" width="20" height="15" rx="2" fill="white" opacity="0.5"/>
          <circle cx="30" cy="32" r="3" fill="white" opacity="0.7"/>
        </svg>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="item-title">{item.title}</h3>
          <span className={`type-badge ${item.type.toLowerCase()}`}>
            {item.type}
          </span>
        </div>

        <p className="item-description">{item.description}</p>

        <div className="item-meta">
          <div className="meta-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3 2a1 1 0 011-1h6a1 1 0 011 1v1h1a1 1 0 011 1v7a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1h1V2z"/>
            </svg>
            <span>{item.category}</span>
          </div>

          <div className="meta-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path fillRule="evenodd" d="M7 1.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM7 0a7 7 0 110 14A7 7 0 017 0z"/>
              <path d="M7 4a.5.5 0 01.5.5v2.793l1.854 1.853a.5.5 0 01-.708.708l-2-2A.5.5 0 016.5 7.5v-3A.5.5 0 017 4z"/>
            </svg>
            <span>{item.location}</span>
          </div>

          <div className="meta-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path fillRule="evenodd" d="M7 13A6 6 0 107 1a6 6 0 000 12zm0 1A7 7 0 107 0a7 7 0 000 14z"/>
              <path fillRule="evenodd" d="M6.5 3a.5.5 0 01.5.5v3.793l1.854 1.853a.5.5 0 01-.708.708l-2-2A.5.5 0 016 7.5v-4a.5.5 0 01.5-.5z"/>
            </svg>
            <span>{item.timeAgo} • Expires in {item.expiresIn}</span>
          </div>
        </div>

        <div className="card-footer">
          <span className="posted-by">Posted by {item.postedBy}</span>
          <button className="btn-contact">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1h-2.586l-2.707 2.707a1 1 0 01-1.414 0L3.586 11H3a1 1 0 01-1-1V3z"/>
            </svg>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default LostFoundCard;