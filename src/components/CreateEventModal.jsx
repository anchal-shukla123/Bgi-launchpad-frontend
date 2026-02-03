import React, { useState } from 'react';
import { useCreateEvent } from '../hooks/useApi';
import '../styles/Modal.css';

const CreateEventModal = ({ onClose, onSuccess }) => {
  const { createEvent, loading } = useCreateEvent();
  
  const [formData, setFormData] = useState({
    title: '',
    eventDate: '',
    startTime: '09:00',
    endTime: '17:00',
    venue: '',
    description: '',
    maxParticipants: 100,
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.eventDate || !formData.venue || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate title length
    if (formData.title.length < 5 || formData.title.length > 200) {
      setError('Title must be between 5 and 200 characters');
      return;
    }

    // Validate venue length
    if (formData.venue.length > 200) {
      setError('Venue cannot exceed 200 characters');
      return;
    }

    // Validate description length
    if (formData.description.length > 5000) {
      setError('Description cannot exceed 5000 characters');
      return;
    }

    // Validate max participants
    if (formData.maxParticipants < 1) {
      setError('Maximum participants must be at least 1');
      return;
    }

    // Convert date and time to ISO format for LocalDateTime
    const startDateTime = `${formData.eventDate}T${formData.startTime || '09:00'}:00`;
    const endDateTime = `${formData.eventDate}T${formData.endTime || '17:00'}:00`;

    // Prepare data matching EventRequestDTO structure
    const eventData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      venue: formData.venue.trim(),
      eventDate: formData.eventDate, // LocalDate format: YYYY-MM-DD
      startTime: startDateTime, // LocalDateTime format: YYYY-MM-DDTHH:mm:ss
      endTime: endDateTime, // LocalDateTime format: YYYY-MM-DDTHH:mm:ss
      maxParticipants: parseInt(formData.maxParticipants) || 100,
      registrationDeadline: startDateTime, // Optional: set to event start time or null
      committeeId: null, // Optional: set if you have committee selection
      registrationLink: null, // Optional
      imageUrl: null // Optional
    };

    console.log('Creating event with data:', eventData);

    try {
      const result = await createEvent(eventData);
      
      if (result.success) {
        console.log('Event created successfully!', result.data);
        alert('Event created successfully!');
        onSuccess();
        onClose();
      } else {
        console.error('Failed to create event:', result.error);
        setError(result.error?.message || 'Failed to create event. Please try again.');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create New Event</h2>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-alert" style={{
              marginBottom: '16px', 
              padding: '12px', 
              backgroundColor: '#FEE2E2', 
              color: '#DC2626', 
              borderRadius: '8px',
              border: '1px solid #FCA5A5'
            }}>
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Event Title * (5-200 characters)</label>
              <input 
                type="text"
                placeholder="e.g., Tech Symposium 2025"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                disabled={loading}
                minLength={5}
                maxLength={200}
              />
            </div>

            <div className="form-group">
              <label>Date *</label>
              <input 
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                required
                disabled={loading}
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Time *</label>
              <input 
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>End Time *</label>
              <input 
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Venue * (max 200 characters)</label>
              <input 
                type="text"
                placeholder="e.g., Main Auditorium"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                required
                disabled={loading}
                maxLength={200}
              />
            </div>

            <div className="form-group">
              <label>Max Participants *</label>
              <input 
                type="number"
                placeholder="100"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                min="1"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description * (max 5000 characters)</label>
            <textarea 
              placeholder="Describe your event..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              required
              disabled={loading}
              maxLength={5000}
            />
            <small style={{ color: '#6B7280', fontSize: '12px' }}>
              {formData.description.length} / 5000 characters
            </small>
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;