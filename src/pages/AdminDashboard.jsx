import React from 'react';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const stats = [
    {
      icon: '💬',
      label: 'Total Announcements',
      value: '24',
      change: '+3 this week',
      color: '#3B82F6'
    },
    {
      icon: '👁️',
      label: 'Average Views',
      value: '234',
      change: '+12% from last week',
      color: '#EC4899'
    },
    {
      icon: '📈',
      label: 'Student Engagement',
      value: '87%',
      change: '+5% this month',
      color: '#10B981'
    },
    {
      icon: '📅',
      label: 'Active Events',
      value: '8',
      change: '3 upcoming',
      color: '#F59E0B'
    }
  ];

  const topAnnouncements = [
    { title: 'Winter Break Schedule', views: 567, comments: 12 },
    { title: 'Hackathon Registration Open', views: 234, comments: 8 },
    { title: 'Workshop on CAD Design', views: 189, comments: 4 }
  ];

  const departmentEngagement = [
    { name: 'Computer Science', students: 450, engagement: 92 },
    { name: 'Mechanical', students: 380, engagement: 85 },
    { name: 'Electrical', students: 340, engagement: 78 },
    { name: 'Civil', students: 290, engagement: 81 }
  ];

  const recentActivity = [
    { type: 'announcement', title: 'Winter Break Schedule', time: '2 hours ago' },
    { type: 'event', title: 'TechFest 2025', time: '5 hours ago' },
    { type: 'poll', title: 'Preferred hackathon theme', time: '1 day ago' },
    { type: 'announcement', title: 'Workshop on CAD Design', time: '2 days ago' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="subtitle">Track engagement and analytics</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{backgroundColor: stat.color}}>
                {stat.icon}
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#ccc">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <h2 className="stat-value">{stat.value}</h2>
              <p className="stat-change">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>Top Announcements</h2>
          <div className="announcement-list">
            {topAnnouncements.map((announcement, index) => (
              <div key={index} className="announcement-item">
                <h3>{announcement.title}</h3>
                <div className="announcement-stats">
                  <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M7 2C4.239 2 2 4.239 2 7s2.239 5 5 5c.446 0 .882-.061 1.3-.175l2.033 1.017V10.5c1.179-.99 1.667-2.425 1.667-3.5 0-2.761-2.239-5-5-5zm0 8c-1.841 0-3.333-1.492-3.333-3S5.159 4 7 4s3.333 1.492 3.333 3S8.841 10 7 10z"/>
                    </svg>
                    {announcement.views}
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M2 3.5A1.5 1.5 0 013.5 2h7A1.5 1.5 0 0112 3.5v5.793a1.5 1.5 0 01-1.5 1.5H7.914l-2.207 2.207a1 1 0 01-1.414 0L2.086 10.793H3.5A1.5 1.5 0 012 9.293V3.5z"/>
                    </svg>
                    {announcement.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <h2>Department Engagement</h2>
          <div className="engagement-list">
            {departmentEngagement.map((dept, index) => (
              <div key={index} className="engagement-item">
                <div className="engagement-info">
                  <h3>{dept.name}</h3>
                  <p>{dept.students} students</p>
                </div>
                <div className="engagement-bar">
                  <div className="engagement-fill" style={{width: `${dept.engagement}%`}}></div>
                </div>
                <span className="engagement-percent">{dept.engagement}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="activity-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'announcement' && '📢'}
                {activity.type === 'event' && '📅'}
                {activity.type === 'poll' && '📊'}
              </div>
              <div className="activity-content">
                <p className="activity-type">
                  {activity.type === 'announcement' && 'New announcement posted'}
                  {activity.type === 'event' && 'Event created'}
                  {activity.type === 'poll' && 'Poll closed'}
                </p>
                <h4>{activity.title}</h4>
              </div>
              <span className="activity-time">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;