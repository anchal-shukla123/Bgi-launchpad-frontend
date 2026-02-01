import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Announcements from './pages/Announcements';
import Events from './pages/Events';
import LostAndFound from './pages/LostAndFound';
import AdminDashboard from './pages/AdminDashboard';
import './styles/App.css';

function App() {
  const [userRole, setUserRole] = useState('Student'); // 'Student' or 'HOD'

  return (
    <Router>
      <div className="app">
        <Navbar userRole={userRole} setUserRole={setUserRole} />
        <Routes>
          <Route path="/" element={<Navigate to="/announcements" />} />
          <Route path="/announcements" element={<Announcements userRole={userRole} />} />
          <Route path="/events" element={<Events userRole={userRole} />} />
          <Route path="/lost-found" element={<LostAndFound />} />
          <Route 
            path="/admin" 
            element={userRole === 'HOD' ? <AdminDashboard /> : <Navigate to="/announcements" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;