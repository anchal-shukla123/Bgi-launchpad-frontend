import React, { useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import CreateAnnouncementModal from '../components/CreateAnnouncementModal';
import '../styles/Announcements.css';

const Announcements = ({ userRole }) => {
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [showModal, setShowModal] = useState(false);

  const announcements = [
    {
      id: 1,
      department: 'Computer Science',
      time: '2 hours ago',
      title: 'Hackathon Registration Open',
      content: 'Annual inter-college hackathon registration is now open. Team size: 3-4 members. Prize pool: ₹50,000. Last date: Dec 20, 2025.',
      author: 'Dr. Sharma (CS HOD)',
      views: 234,
      comments: 2,
      poll: {
        question: 'Preferred hackathon theme?',
        options: [
          { text: 'AI/ML', votes: 45 },
          { text: 'Web Development', votes: 32 },
          { text: 'Mobile Apps', votes: 28 },
          { text: 'IoT', votes: 15 }
        ],
        totalVotes: 120
      }
    },
    {
      id: 2,
      department: 'Mechanical',
      time: '5 hours ago',
      title: 'Workshop on CAD Design - Dec 15',
      content: 'Two-day workshop on advanced CAD design techniques. Industry experts from Tata Motors. Limited seats available.',
      author: 'Prof. Verma (Mech HOD)',
      views: 189,
      comments: 0
    },
    {
      id: 3,
      department: 'All Departments',
      time: '1 day ago',
      title: 'Winter Break Schedule',
      content: 'Winter break starts from Dec 23rd. Campus will reopen on Jan 6th. All students must vacate hostels by Dec 22nd evening.',
      author: 'Administration',
      views: 567,
      comments: 1
    }
  ];

  const departments = ['All Departments', 'Computer Science', 'Mechanical', 'Electrical', 'Civil'];

  const filteredAnnouncements = selectedDept === 'All Departments' 
    ? announcements 
    : announcements.filter(a => a.department === selectedDept || a.department === 'All Departments');

  return (
    <div className="announcements-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Announcements & Feedback</h1>
          <p className="subtitle">Stay updated with campus news</p>
        </div>
        {userRole === 'HOD' && (
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
            onClick={() => setSelectedDept(dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="announcements-list">
        {filteredAnnouncements.map(announcement => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>

      {showModal && (
        <CreateAnnouncementModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Announcements;