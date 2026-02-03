import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvents, useRegisterForEvent } from '../hooks/useApi';
import apiService from '../api/apiService';
import EventCard from '../components/EventCard';
import CreateEventModal from '../components/CreateEventModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Events.css';
import '../styles/SharedStyles.css'

const Events = () => {
  const { user, isHOD } = useAuth();
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);

  const { data: eventsData, loading, error, refetch } = useEvents({ page, size: 20 });
  const { register: registerForEvent, loading: registering } = useRegisterForEvent();

  const handleRegister = async (eventId) => {
    const result = await registerForEvent(eventId);
    if (result.success) {
      alert('Successfully registered for event!');
      refetch();
    } else {
      alert('Failed to register: ' + (result.error?.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this event?')) {
      try {
        await apiService.deleteEvent(id);
        refetch();
        alert('Event deleted successfully!');
      } catch (err) {
        alert('Failed to delete: ' + err.message);
      }
    }
  };

  const handleSuccess = () => {
    setShowModal(false);
    refetch();
  };

  const filteredEvents = eventsData?.content?.filter(event => 
    statusFilter === 'All' || event.status === statusFilter.toUpperCase()
  ) || [];

  return (
    <div className="events-page">
      <div className="page-header">
        <div className='header-content'>
        <h1>Campus Events</h1>
        <p className="subtitle">Discover and join campus events</p>
        </div>
        {isHOD() && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + Create Event
          </button>
        )}
      </div>

      {/* Status filters with proper styling */}
      <div className="status-filters">
        {['All', 'Upcoming', 'Ongoing', 'Completed'].map(status => (
          <button
            key={status}
            className={statusFilter === status ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} onRetry={refetch} />}

      {!loading && !error && (
        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard 
                key={event.id}
                event={event}
                onRegister={handleRegister}
                onDelete={isHOD() ? handleDelete : null}
                registering={registering}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No events found</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <CreateEventModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default Events;