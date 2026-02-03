import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAnnouncements, useAnnouncementsByDepartment } from '../hooks/useApi';
import apiService from '../api/apiService';
import AnnouncementCard from '../components/AnnouncementCard';
import CreateAnnouncementModal from '../components/CreateAnnouncementModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/Announcements.css';

const Announcements = () => {
  const { isHOD } = useAuth();
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);

  // Fetch announcements based on selected department
  const { 
    data: announcementsData, 
    loading, 
    error, 
    refetch 
  } = selectedDept === 'All Departments'
    ? useAnnouncements({ page, size: 20 })
    : useAnnouncementsByDepartment(getDepartmentId(selectedDept), { page, size: 20 });

  const departments = ['All Departments', 'Computer Science', 'Mechanical', 'Electrical', 'Civil'];

  const handleCreateSuccess = () => {
    setShowModal(false);
    refetch(); // Manual refetch
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await apiService.deleteAnnouncement(id);
        refetch(); // Manual refetch
      } catch (err) {
        alert('Failed to delete announcement: ' + err.message);
      }
    }
  };

  const handleNextPage = () => {
    if (announcementsData && !announcementsData.last) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(prev => prev - 1);
    }
  };

  const handleDepartmentChange = (dept) => {
    setSelectedDept(dept);
    setPage(0); // Reset to first page
  };

  return (
    <div className="announcements-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Announcements & Feedback</h1>
          <p className="subtitle">Stay updated with campus news</p>
        </div>
        {isHOD() && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
            </svg>
            New Announcement
          </button>
        )}
      </div>

      <div className="department-filters">
        {departments.map(dept => (
          <button
            key={dept}
            className={selectedDept === dept ? 'filter-btn active' : 'filter-btn'}
            onClick={() => handleDepartmentChange(dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <ErrorMessage 
          message={error.message || 'Failed to load announcements'} 
          onRetry={refetch}
        />
      )}

      {!loading && !error && announcementsData && (
        <>
          <div className="announcements-list">
            {announcementsData.content && announcementsData.content.length > 0 ? (
              announcementsData.content.map(announcement => (
                <AnnouncementCard 
                  key={announcement.id} 
                  announcement={announcement}
                  onDelete={isHOD() ? handleDelete : null}
                />
              ))
            ) : (
              <div className="empty-state">
                <p>No announcements found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {announcementsData.content && announcementsData.content.length > 0 && (
            <div className="pagination">
              <button 
                onClick={handlePrevPage} 
                disabled={page === 0}
                className="btn-secondary"
              >
                Previous
              </button>
              <span className="page-info">
                Page {page + 1} of {announcementsData.totalPages || 1}
              </span>
              <button 
                onClick={handleNextPage} 
                disabled={announcementsData.last}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {showModal && (
        <CreateAnnouncementModal 
          onClose={() => setShowModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </div>
  );
};

// Helper function to map department names to IDs
function getDepartmentId(deptName) {
  const deptMap = {
    'Computer Science': 1,
    'Mechanical': 2,
    'Electrical': 3,
    'Civil': 4,
  };
  return deptMap[deptName] || null;
}

export default Announcements;