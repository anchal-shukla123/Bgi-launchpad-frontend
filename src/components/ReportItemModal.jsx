import React, { useState } from 'react';
import '../styles/Modal.css';

const ReportItemModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    type: 'lost',
    title: '',
    category: 'Personal Items',
    description: '',
    location: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Item reported:', formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Report Lost/Found Item</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group radio-group">
            <label>Type</label>
            <div className="radio-options">
              <label className="radio-label">
                <input 
                  type="radio"
                  name="type"
                  value="lost"
                  checked={formData.type === 'lost'}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
                <span>I Lost Something</span>
              </label>
              <label className="radio-label">
                <input 
                  type="radio"
                  name="type"
                  value="found"
                  checked={formData.type === 'found'}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
                <span>I Found Something</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Item Title</label>
            <input 
              type="text"
              placeholder="e.g., Black Backpack"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option>Personal Items</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Accessories</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              placeholder="Describe the item in detail..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text"
              placeholder="Where was it lost/found?"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Image (Optional)</label>
            <div className="file-input">
              <input 
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
              />
              <span className="file-placeholder">Choose file No file chosen</span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportItemModal;