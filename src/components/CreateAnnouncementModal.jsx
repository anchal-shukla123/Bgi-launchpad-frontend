import React, { useState } from 'react';
import '../styles/Modal.css';

const CreateAnnouncementModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    department: 'Computer Science',
    title: '',
    content: '',
    includePoll: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create New Announcement</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Department</label>
            <select 
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
            >
              <option>Computer Science</option>
              <option>Mechanical</option>
              <option>Electrical</option>
              <option>Civil</option>
              <option>All Departments</option>
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input 
              type="text"
              placeholder="Announcement title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea 
              placeholder="Write your announcement..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows="6"
              required
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input 
                type="checkbox"
                checked={formData.includePoll}
                onChange={(e) => setFormData({...formData, includePoll: e.target.checked})}
              />
              Include a poll
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;