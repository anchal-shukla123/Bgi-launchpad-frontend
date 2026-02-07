import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Announcements from './pages/Announcements';
import Events from './pages/Events';
import LostAndFound from './pages/LostAndFound';
import AdminDashboard from './pages/AdminDashboard';
import './styles/App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Public routes - NO NAVBAR */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes - WITH NAVBAR */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Navbar />
              <Routes>
                <Route path="/" element={<Navigate to="/announcements" replace />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/events" element={<Events />} />
                <Route path="/lost-found" element={<LostAndFound />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
