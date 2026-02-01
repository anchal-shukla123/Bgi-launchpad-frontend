import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import CreateEventModal from '../components/CreateEventModal';
import '../styles/Events.css';

const Events = ({ userRole }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const events = [
    {
      id: 1,
      title: 'TechFest 2025',
      description: 'Annual technical festival featuring hackathons, tech talks, and exhibitions.',
      date: 'Dec 18, 2025',
      time: '10:00 AM - 6:00 PM',
      venue: 'Main Auditorium',
      organizer: 'Technical Society',
      registered: '234 / 500',
      status: 'Upcoming',
      image: true
    },
    {
      id: 2,
      title: 'Cultural Night',
      description: 'End of semester cultural celebration with music, dance, and drama performances.',
      date: 'Dec 20, 2025',
      time: '7:00 PM - 11:00 PM',
      venue: 'Open Air Theatre',
      organizer: 'Cultural Committee',
      registered: '456 / 800',
      status: 'Upcoming',
      image: true
    },
    {
      id: 3,
      title: 'AI/ML Workshop',
      description: 'Hands-on workshop on building neural networks with PyTorch.',
      date: 'Dec 15, 2025',
      time: '2:00 PM - 5:00 PM',
      venue: 'CS Lab 3',
      organizer: 'Coding Club',
      registered: '45 / 60',
      status: 'Ongoing',
      image: true
    },
    {
      id: 4,
      title: 'Sports Day',
      description: 'Inter-branch sports competitions including cricket, football, basketball, and athletics.',
      date: 'Dec 12, 2025',
      time: 'All Day',
      venue: 'Sports Complex',
      organizer: 'Sports Committee',
      registered: '456 / 800',
      status: 'Completed',
      image: true
    }
  ];

  const filters = ['All', 'Upcoming', 'Ongoing', 'Completed'];

  const filteredEvents = selectedFilter === 'All' 
    ? events 
    : events.filter(e => e.status === selectedFilter);

  return (
    <div className="events-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Events Hub</h1>
          <p className="subtitle">Discover and join campus events</p>
        </div>
        {userRole === 'HOD' && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
            </svg>
            Create Event
          </button>
        )}
      </div>

      <div className="event-filters">
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

      <div className="events-grid">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {showModal && (
        <CreateEventModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Events;