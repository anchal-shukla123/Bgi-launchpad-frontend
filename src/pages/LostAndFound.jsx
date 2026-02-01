import React, { useState } from 'react';
import LostFoundCard from '../components/LostFoundCard';
import ReportItemModal from '../components/ReportItemModal';
import '../styles/LostAndFound.css';

const LostAndFound = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const items = [
    {
      id: 1,
      type: 'Lost',
      title: 'Black Wallet',
      description: 'Black leather wallet with student ID and some cash. Lost near library.',
      category: 'Personal Items',
      location: 'Central Library',
      timeAgo: '2 hours ago',
      expiresIn: '28 days',
      postedBy: 'Rahul Sharma',
      color: '#FF6B6B'
    },
    {
      id: 2,
      type: 'Found',
      title: 'Blue Water Bottle',
      description: 'Milton brand blue water bottle found in CS Lab.',
      category: 'Personal Items',
      location: 'CS Lab 2',
      timeAgo: '5 hours ago',
      expiresIn: '29 days',
      postedBy: 'Priya Singh',
      color: '#4ECDC4'
    },
    {
      id: 3,
      type: 'Lost',
      title: 'Samsung Galaxy Earbuds',
      description: 'White Samsung Galaxy Buds with charging case. Lost in cafeteria area.',
      category: 'Electronics',
      location: 'Cafeteria',
      timeAgo: '1 day ago',
      expiresIn: '27 days',
      postedBy: 'Amit Kumar',
      color: '#FF6B6B'
    },
    {
      id: 4,
      type: 'Found',
      title: 'Engineering Textbook',
      description: 'Mechanical Engineering textbook found in Lecture Hall 3.',
      category: 'Books',
      location: 'Lecture Hall 3',
      timeAgo: '2 days ago',
      expiresIn: '26 days',
      postedBy: 'Neha Patel',
      color: '#4ECDC4'
    }
  ];

  const filters = ['All', 'Lost', 'Found'];

  const filteredItems = selectedFilter === 'All' 
    ? items 
    : items.filter(item => item.type === selectedFilter);

  return (
    <div className="lost-found-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Lost & Found</h1>
          <p className="subtitle">Help reunite items with their owners</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
          </svg>
          Report Item
        </button>
      </div>

      <div className="search-filter-bar">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
          </svg>
          <input type="text" placeholder="Search items..." />
        </div>

        <div className="filter-buttons">
          {filters.map(filter => (
            <button
              key={filter}
              className={selectedFilter === filter ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="items-grid">
        {filteredItems.map(item => (
          <LostFoundCard key={item.id} item={item} />
        ))}
      </div>

      {showModal && (
        <ReportItemModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default LostAndFound;