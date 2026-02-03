import React, { useState } from 'react';
import { useCreateAnnouncement } from '../hooks/useApi';
import '../styles/Modal.css';

const CreateAnnouncementModal = ({ onClose, onSuccess }) => {
  const { createAnnouncement, loading } = useCreateAnnouncement();
  
  const [formData, setFormData] = useState({
    departmentId: 1, // Default to Computer Science
    title: '',
    description: '',
    hasPoll: false
  });

  const [error, setError] = useState('');

  const departmentMap = {
    'Computer Science': 1,
    'Mechanical': 2,
    'Electrical': 3,
    'Civil': 4,
    'All Departments': null
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Prepare data for backend
    const announcementData = {
      title: formData.title,
      description: formData.description,
      departmentId: formData.departmentId,
      userId: user.id || 1,
      hasPoll: formData.hasPoll,
      viewCount: 0,
      commentCount: 0
    };

    console.log('Creating announcement:', announcementData);

    const result = await createAnnouncement(announcementData);
    
    if (result.success) {
      console.log('Announcement created successfully!', result.data);
      alert('Announcement published successfully!');
      onSuccess(); // This will refresh the announcements list
    } else {
      console.error('Failed to create announcement:', result.error);
      setError(result.error?.message || 'Failed to create announcement. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create New Announcement</h2>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-alert" style={{marginBottom: '16px', padding: '12px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px'}}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Department *</label>
            <select 
              value={Object.keys(departmentMap).find(key => departmentMap[key] === formData.departmentId)}
              onChange={(e) => setFormData({...formData, departmentId: departmentMap[e.target.value]})}
              disabled={loading}
            >
              <option>Computer Science</option>
              <option>Mechanical</option>
              <option>Electrical</option>
              <option>Civil</option>
              <option>All Departments</option>
            </select>
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input 
              type="text"
              placeholder="Announcement title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Content *</label>
            <textarea 
              placeholder="Write your announcement..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="6"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input 
                type="checkbox"
                checked={formData.hasPoll}
                onChange={(e) => setFormData({...formData, hasPoll: e.target.checked})}
                disabled={loading}
              />
              Include a poll
            </label>
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
              {loading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;