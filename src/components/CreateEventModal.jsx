import React, { useState } from 'react';
import '../styles/Modal.css';

const CreateEventModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    organizer: '',
    registrationLink: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event created:', formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create New Event</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Event Title</label>
              <input 
                type="text"
                placeholder="e.g., Tech Symposium 2025"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input 
                type="text"
                placeholder="dd-mm-yyyy"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Time</label>
              <input 
                type="text"
                placeholder="e.g., 10:00 AM - 4:00 PM"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Venue</label>
              <input 
                type="text"
                placeholder="e.g., Main Auditorium"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              placeholder="Describe your event..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Organizer</label>
              <input 
                type="text"
                placeholder="e.g., Technical Committee"
                value={formData.organizer}
                onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Registration Link (Optional)</label>
              <input 
                type="text"
                placeholder="https://..."
                value={formData.registrationLink}
                onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;