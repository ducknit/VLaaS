// src/App.jsx - CORRECTED VERSION

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Remove BrowserRouter import here
import LandingPage from './LandingPage';
import DashboardPage from './DashboardPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import InstructorDashboardPage from './pages/InstructorDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import './App.css';

function App() {
  // Check local storage for a user on initial load
  const getInitialUser = () => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  };

  const [user, setUser] = useState(getInitialUser);

  // Use useEffect to save user to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    // <Router> <-- REMOVE THIS LINE
      <div className="App">
        <Routes>
          {/* Public Route: Landing Page */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <LandingPage setUser={setUser} />} 
          />

          {/* Protected Routes: Require user to be logged in */}
          <Route 
            path="/dashboard" 
            element={user ? <DashboardPage user={user} setUser={setUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/student-dashboard" 
            element={user ? <StudentDashboardPage user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/instructor-dashboard" 
            element={user ? <InstructorDashboardPage user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin-dashboard" 
            element={user ? <AdminDashboardPage user={user} /> : <Navigate to="/" />} 
          />

          {/* Catch-all for undefined routes - redirects to home or login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    // </Router> <-- AND THIS LINE
  );
}

export default App;