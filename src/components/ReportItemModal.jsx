import React, { useState } from 'react';
import { useCreateLostFound } from '../hooks/useApi';
import '../styles/Modal.css';

const ReportItemModal = ({ onClose, onSuccess }) => {
  const { createItem, loading } = useCreateLostFound();
  
  const [formData, setFormData] = useState({
    type: 'LOST', // Backend expects LOST/FOUND
    itemName: '',
    category: 'Personal Items',
    description: '',
    location: '',
    contactInfo: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.itemName || !formData.description || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Prepare data for backend
    const itemData = {
      itemName: formData.itemName,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      status: formData.type, // LOST or FOUND
      userId: user.id || 1, // Use logged-in user ID
      contactInfo: formData.contactInfo || user.email || '',
      imageUrl: null // No image upload for now
    };

    console.log('Submitting lost/found item:', itemData);

    const result = await createItem(itemData);
    
    if (result.success) {
      console.log('Item created successfully!', result.data);
      alert('Item reported successfully!');
      onSuccess(); // This will refresh the list
    } else {
      console.error('Failed to create item:', result.error);
      setError(result.error?.message || 'Failed to report item. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Report Lost/Found Item</h2>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-alert" style={{marginBottom: '16px', padding: '12px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px'}}>
              {error}
            </div>
          )}

          <div className="form-group radio-group">
            <label>Type</label>
            <div className="radio-options">
              <label className="radio-label">
                <input 
                  type="radio"
                  name="type"
                  value="LOST"
                  checked={formData.type === 'LOST'}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
                <span>I Lost Something</span>
              </label>
              <label className="radio-label">
                <input 
                  type="radio"
                  name="type"
                  value="FOUND"
                  checked={formData.type === 'FOUND'}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
                <span>I Found Something</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Item Title *</label>
            <input 
              type="text"
              placeholder="e.g., Black Backpack"
              value={formData.itemName}
              onChange={(e) => setFormData({...formData, itemName: e.target.value})}
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
            <label>Description *</label>
            <textarea 
              placeholder="Describe the item in detail..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input 
              type="text"
              placeholder="Where was it lost/found?"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Info (Optional)</label>
            <input 
              type="text"
              placeholder="Email or phone number"
              value={formData.contactInfo}
              onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
            />
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
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportItemModal;