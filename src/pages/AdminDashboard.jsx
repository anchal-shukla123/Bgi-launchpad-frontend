// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import apiService from '../api/apiService';
// import '../styles/AdminDashboard.css';

// const AdminDashboard = () => {
//   const { user, isHOD } = useAuth();
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     announcements: 0,
//     events: 0,
//     avgViews: 0,
//     engagement: 0
//   });
//   const [topAnnouncements, setTopAnnouncements] = useState([]);
//   const [departmentStats, setDepartmentStats] = useState([
//     { name: 'Computer Science', students: 450, engagement: 92 },
//     { name: 'Mechanical', students: 380, engagement: 85 },
//     { name: 'Electrical', students: 340, engagement: 78 },
//     { name: 'Civil', students: 290, engagement: 81 }
//   ]);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isHOD()) {
//       navigate('/announcements');
//       return;
//     }

//     fetchDashboardData();
//   }, [isHOD, navigate]);

//   const fetchDashboardData = async () => {
//     try {
//       const [announcements, events, lostFound] = await Promise.all([
//         apiService.getAnnouncements(),
//         apiService.getEvents(),
//         apiService.getLostFoundItems()
//       ]);

//       const announcementsList = announcements?.content || announcements || [];
//       const eventsList = events?.content || events || [];

//       // Calculate stats
//       const totalAnnouncements = announcementsList.length;
//       const totalViews = announcementsList.reduce((sum, a) => sum + (a.viewCount || 0), 0);
//       const avgViews = totalAnnouncements > 0 ? Math.round(totalViews / totalAnnouncements) : 0;

//       setStats({
//         announcements: totalAnnouncements,
//         events: eventsList.length,
//         avgViews: avgViews,
//         engagement: 87 // Mock engagement
//       });

//       // Top announcements (sorted by views)
//       const sorted = [...announcementsList]
//         .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
//         .slice(0, 3);
//       setTopAnnouncements(sorted);

//       // Recent activity (mock for now)
//       setRecentActivity([
//         { type: 'announcement', title: announcementsList[0]?.title || 'Winter Break Schedule', time: '2 hours ago' },
//         { type: 'event', title: eventsList[0]?.title || 'TechFest 2025', time: '5 hours ago' },
//         { type: 'poll', title: 'Preferred hackathon theme', time: '1 day ago' },
//         { type: 'announcement', title: announcementsList[1]?.title || 'Workshop on CAD Design', time: '2 days ago' }
//       ]);

//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="admin-dashboard">
//         <div className="loading-container">
//           <div className="spinner"></div>
//           <p>Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-dashboard">
//       {/* Header */}
//       <div className="dashboard-header">
//         <div>
//           <h1>Admin Dashboard</h1>
//           <p className="subtitle">Track engagement and analytics</p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="stats-grid">
//         <div className="stat-card blue">
//           <div className="stat-icon blue">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M20 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2z"/>
//             </svg>
//           </div>
//           <div className="stat-content">
//             <p className="stat-label">Total Announcements</p>
//             <h3 className="stat-value">{stats.announcements}</h3>
//             <p className="stat-change positive">+3 this week</p>
//           </div>
//           <div className="stat-chart">
//             <svg width="60" height="30" viewBox="0 0 60 30">
//               <path d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,8 L60,5" stroke="#3B82F6" strokeWidth="2" fill="none"/>
//             </svg>
//           </div>
//         </div>

//         <div className="stat-card purple">
//           <div className="stat-icon purple">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
//             </svg>
//           </div>
//           <div className="stat-content">
//             <p className="stat-label">Average Views</p>
//             <h3 className="stat-value">{stats.avgViews}</h3>
//             <p className="stat-change positive">+12% from last week</p>
//           </div>
//           <div className="stat-chart">
//             <svg width="60" height="30" viewBox="0 0 60 30">
//               <path d="M0,25 L10,20 L20,22 L30,15 L40,17 L50,12 L60,10" stroke="#A855F7" strokeWidth="2" fill="none"/>
//             </svg>
//           </div>
//         </div>

//         <div className="stat-card green">
//           <div className="stat-icon green">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m18-7l-3-3m0 0l-3 3m3-3v6M9 7a4 4 0 11-8 0 4 4 0 018 0z"/>
//             </svg>
//           </div>
//           <div className="stat-content">
//             <p className="stat-label">Student Engagement</p>
//             <h3 className="stat-value">{stats.engagement}%</h3>
//             <p className="stat-change positive">+5% this month</p>
//           </div>
//           <div className="stat-chart">
//             <svg width="60" height="30" viewBox="0 0 60 30">
//               <path d="M0,22 L10,18 L20,20 L30,14 L40,15 L50,10 L60,8" stroke="#10B981" strokeWidth="2" fill="none"/>
//             </svg>
//           </div>
//         </div>

//         <div className="stat-card orange">
//           <div className="stat-icon orange">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
//             </svg>
//           </div>
//           <div className="stat-content">
//             <p className="stat-label">Active Events</p>
//             <h3 className="stat-value">{stats.events}</h3>
//             <p className="stat-change neutral">3 upcoming</p>
//           </div>
//           <div className="stat-chart">
//             <svg width="60" height="30" viewBox="0 0 60 30">
//               <path d="M0,24 L10,22 L20,24 L30,18 L40,19 L50,15 L60,12" stroke="#F97316" strokeWidth="2" fill="none"/>
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Two Column Layout */}
//       <div className="dashboard-content">
//         {/* Left Column */}
//         <div className="dashboard-left">
//           {/* Top Announcements */}
//           <div className="card">
//             <h2 className="card-title">Top Announcements</h2>
//             <div className="announcements-list">
//               {topAnnouncements.length > 0 ? (
//                 topAnnouncements.map((announcement) => (
//                   <div key={announcement.id} className="announcement-item">
//                     <h4>{announcement.title}</h4>
//                     <div className="announcement-stats">
//                       <span>
//                         <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
//                           <path d="M8 4.5C4.5 4.5 1.5 7 0 10c1.5 3 4.5 5.5 8 5.5s6.5-2.5 8-5.5c-1.5-3-4.5-5.5-8-5.5z"/>
//                           <circle cx="8" cy="10" r="2"/>
//                         </svg>
//                         {announcement.viewCount || 0}
//                       </span>
//                       <span>
//                         <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
//                           <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1h-2l-3 3-3-3H3a1 1 0 01-1-1V3z"/>
//                         </svg>
//                         {announcement.commentCount || 0}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="empty-state">No announcements yet</p>
//               )}
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="card">
//             <h2 className="card-title">Recent Activity</h2>
//             <div className="activity-list">
//               {recentActivity.map((activity, index) => (
//                 <div key={index} className="activity-item">
//                   <div className="activity-content">
//                     <p className="activity-title">
//                       {activity.type === 'announcement' && 'New announcement posted'}
//                       {activity.type === 'event' && 'Event created'}
//                       {activity.type === 'poll' && 'Poll closed'}
//                     </p>
//                     <p className="activity-subtitle">{activity.title}</p>
//                   </div>
//                   <span className="activity-time">{activity.time}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="dashboard-right">
//           {/* Department Engagement */}
//           <div className="card">
//             <h2 className="card-title">Department Engagement</h2>
//             <div className="department-list">
//               {departmentStats.map((dept, index) => (
//                 <div key={index} className="department-item">
//                   <div className="department-info">
//                     <p className="department-name">{dept.name}</p>
//                     <p className="department-students">{dept.students} students</p>
//                   </div>
//                   <div className="department-engagement">
//                     <span className="engagement-value">{dept.engagement}%</span>
//                     <div className="progress-bar">
//                       <div 
//                         className="progress-fill" 
//                         style={{width: `${dept.engagement}%`}}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user, isHOD } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    announcements: 0,
    events: 0,
    avgViews: 0,
    engagement: 0
  });
  const [topAnnouncements, setTopAnnouncements] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isHOD()) {
      navigate('/announcements');
      return;
    }

    fetchDashboardData();
  }, [isHOD, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [announcements, events, lostFound] = await Promise.all([
        apiService.getAnnouncements(),
        apiService.getEvents(),
        apiService.getLostFoundItems()
      ]);

      const announcementsList = announcements?.content || announcements || [];
      const eventsList = events?.content || events || [];

      // Calculate actual stats from database
      const totalAnnouncements = announcementsList.length;
      const totalViews = announcementsList.reduce((sum, a) => sum + (a.viewCount || 0), 0);
      const avgViews = totalAnnouncements > 0 ? Math.round(totalViews / totalAnnouncements) : 0;
      
      // Calculate engagement based on actual data
      const totalComments = announcementsList.reduce((sum, a) => sum + (a.commentCount || 0), 0);
      const engagementScore = totalAnnouncements > 0 
        ? Math.min(Math.round(((totalViews + totalComments * 5) / (totalAnnouncements * 10)) * 100), 100)
        : 0;

      setStats({
        announcements: totalAnnouncements,
        events: eventsList.length,
        avgViews: avgViews,
        engagement: engagementScore
      });

      // Top announcements (sorted by views)
      const sorted = [...announcementsList]
        .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
        .slice(0, 3);
      setTopAnnouncements(sorted);

      // Build recent activity from actual data
      const activity = [];
      
      // Add recent announcements
      announcementsList.slice(0, 2).forEach(ann => {
        activity.push({
          type: 'announcement',
          title: ann.title,
          time: getTimeAgo(ann.createdAt)
        });
      });
      
      // Add recent events
      eventsList.slice(0, 2).forEach(evt => {
        activity.push({
          type: 'event',
          title: evt.title,
          time: getTimeAgo(evt.createdAt)
        });
      });
      
      // Sort by most recent
      activity.sort((a, b) => {
        const aTime = parseTimeAgo(a.time);
        const bTime = parseTimeAgo(b.time);
        return aTime - bTime;
      });
      
      setRecentActivity(activity.slice(0, 4));

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Unknown time';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const parseTimeAgo = (timeStr) => {
    if (timeStr === 'Just now') return 0;
    const match = timeStr.match(/(\d+)\s+(minute|hour|day)/);
    if (!match) return 999999;
    const num = parseInt(match[1]);
    const unit = match[2];
    if (unit === 'minute') return num;
    if (unit === 'hour') return num * 60;
    return num * 1440;
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="subtitle">Track engagement and analytics</p>
        </div>
      </div>

      {/* Stats Cards - Full Width */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2z"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Announcements</p>
            <h3 className="stat-value">{stats.announcements}</h3>
            <p className="stat-change positive">+{stats.announcements > 0 ? Math.min(3, stats.announcements) : 0} this week</p>
          </div>
          <div className="stat-chart">
            <svg width="60" height="30" viewBox="0 0 60 30">
              <path d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,8 L60,5" stroke="#3B82F6" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Average Views</p>
            <h3 className="stat-value">{stats.avgViews}</h3>
            <p className="stat-change positive">+{stats.avgViews > 0 ? Math.min(12, Math.round(stats.avgViews / 10)) : 0}% from last week</p>
          </div>
          <div className="stat-chart">
            <svg width="60" height="30" viewBox="0 0 60 30">
              <path d="M0,25 L10,20 L20,22 L30,15 L40,17 L50,12 L60,10" stroke="#A855F7" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m18-7l-3-3m0 0l-3 3m3-3v6M9 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Student Engagement</p>
            <h3 className="stat-value">{stats.engagement}%</h3>
            <p className="stat-change positive">+{Math.min(5, Math.round(stats.engagement / 20))}% this month</p>
          </div>
          <div className="stat-chart">
            <svg width="60" height="30" viewBox="0 0 60 30">
              <path d="M0,22 L10,18 L20,20 L30,14 L40,15 L50,10 L60,8" stroke="#10B981" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon orange">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Events</p>
            <h3 className="stat-value">{stats.events}</h3>
            <p className="stat-change neutral">{Math.max(0, stats.events - 1)} upcoming</p>
          </div>
          <div className="stat-chart">
            <svg width="60" height="30" viewBox="0 0 60 30">
              <path d="M0,24 L10,22 L20,24 L30,18 L40,19 L50,15 L60,12" stroke="#F97316" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="dashboard-left">
          {/* Top Announcements */}
          <div className="card">
            <h2 className="card-title">Top Announcements</h2>
            <div className="announcements-list">
              {topAnnouncements.length > 0 ? (
                topAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="announcement-item">
                    <h4>{announcement.title}</h4>
                    <div className="announcement-stats">
                      <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 4.5C4.5 4.5 1.5 7 0 10c1.5 3 4.5 5.5 8 5.5s6.5-2.5 8-5.5c-1.5-3-4.5-5.5-8-5.5z"/>
                          <circle cx="8" cy="10" r="2"/>
                        </svg>
                        {announcement.viewCount || 0}
                      </span>
                      <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1h-2l-3 3-3-3H3a1 1 0 01-1-1V3z"/>
                        </svg>
                        {announcement.commentCount || 0}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">No announcements yet</p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="card-title">Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-content">
                      <p className="activity-title">
                        {activity.type === 'announcement' && 'New announcement posted'}
                        {activity.type === 'event' && 'Event created'}
                        {activity.type === 'poll' && 'Poll closed'}
                      </p>
                      <p className="activity-subtitle">{activity.title}</p>
                    </div>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                ))
              ) : (
                <p className="empty-state">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - REMOVED DUMMY DEPARTMENT DATA */}
        <div className="dashboard-right">
          <div className="card">
            <h2 className="card-title">Quick Actions</h2>
            <div className="quick-actions-list">
              <button 
                className="quick-action-btn"
                onClick={() => navigate('/announcements')}
              >
                <div className="action-icon blue">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2z"/>
                  </svg>
                </div>
                <div className="action-text">
                  <p className="action-title">Create Announcement</p>
                  <p className="action-subtitle">Post updates to students</p>
                </div>
              </button>

              <button 
                className="quick-action-btn"
                onClick={() => navigate('/events')}
              >
                <div className="action-icon green">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div className="action-text">
                  <p className="action-title">Create Event</p>
                  <p className="action-subtitle">Schedule campus events</p>
                </div>
              </button>

              <button 
                className="quick-action-btn"
                onClick={() => navigate('/lost-found')}
              >
                <div className="action-icon orange">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
                  </svg>
                </div>
                <div className="action-text">
                  <p className="action-title">View Lost & Found</p>
                  <p className="action-subtitle">Manage reported items</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;