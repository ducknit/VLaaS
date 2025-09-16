// src/DashboardPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// NEW AND IMPROVED ICONS for the roles
const StudentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-purple-400 group-hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6.5m0 0l-9-5m9 5l9-5M5 13.5l7 4 7-4" />
  </svg>
);

const InstructorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-purple-400 group-hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9a2 2 0 00-2-2h-7m-2 4h-2a2 2 0 00-2 2v4a2 2 0 002 2h2m-2-4v4m0-4h.01M17 10v.01M17 14v.01M17 18v.01" />
  </svg>
);

const AdminIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-purple-400 group-hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

// Fallback Avatar Icon
const DefaultAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
  </svg>
);

const DashboardPage = ({ user, setUser }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    setUser(null);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log(`User selected role: ${role}`);
    
    // Navigate based on the selected role
    switch (role) {
      case 'Student':
        navigate('/student-dashboard');
        break;
      case 'Instructor':
        navigate('/instructor-dashboard');
        break;
      case 'Admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/dashboard'); // Fallback or stay on current page
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">VLaaS</h1>
            <span className="text-gray-400">|</span>
            <p className="text-lg text-indigo-400">Welcome, <strong>{user.name}</strong></p>
          </div>
          <div className="flex items-center space-x-4">
            {user.picture ? (
              <img 
                src={user.picture} 
                alt="User avatar" 
                className="w-10 h-10 rounded-full border-2 border-indigo-500"
              />
            ) : (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 border-2 border-indigo-500">
                <DefaultAvatar />
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition duration-150 ease-in-out"
            >
              Logout
            </button>
        </div>
        </div>
      </nav>

      {/* Main content for role selection */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-5xl font-extrabold text-white mb-6 animate-fade-in-down">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-400 mb-12 animate-fade-in-up">
            Select your role to access personalized features and content within VLaaS.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Role Card */}
            <div 
              className={`group bg-gray-800 p-8 rounded-xl shadow-2xl flex flex-col items-center cursor-pointer 
                ${selectedRole === 'Student' ? 'border-4 border-purple-600 ring-2 ring-purple-500' : 'border-4 border-transparent'}
                transform hover:scale-105 hover:bg-purple-700 transition-all duration-300 ease-in-out`}
              onClick={() => handleRoleSelect('Student')}
            >
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-purple-500 bg-opacity-30 group-hover:bg-white group-hover:bg-opacity-20 mb-6 transition-all duration-200">
                <StudentIcon />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-200">Student</h3>
              <p className="text-gray-300 text-center leading-relaxed group-hover:text-gray-100 transition-colors duration-200">
                Dive into your virtual labs, submit assignments, track your progress, and view your grades. Your learning journey starts here.
              </p>
            </div>

            {/* Instructor Role Card */}
            <div 
              className={`group bg-gray-800 p-8 rounded-xl shadow-2xl flex flex-col items-center cursor-pointer 
                ${selectedRole === 'Instructor' ? 'border-4 border-purple-600 ring-2 ring-purple-500' : 'border-4 border-transparent'}
                transform hover:scale-105 hover:bg-purple-700 transition-all duration-300 ease-in-out`}
              onClick={() => handleRoleSelect('Instructor')}
            >
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-purple-500 bg-opacity-30 group-hover:bg-white group-hover:bg-opacity-20 mb-6 transition-all duration-200">
                <InstructorIcon />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-200">Instructor</h3>
              <p className="text-gray-300 text-center leading-relaxed group-hover:text-gray-100 transition-colors duration-200">
                Empower your teaching with tools to manage courses, create engaging labs, grade submissions, and monitor student progress efficiently.
              </p>
            </div>

            {/* Admin Role Card */}
            <div 
              className={`group bg-gray-800 p-8 rounded-xl shadow-2xl flex flex-col items-center cursor-pointer 
                ${selectedRole === 'Admin' ? 'border-4 border-purple-600 ring-2 ring-purple-500' : 'border-4 border-transparent'}
                transform hover:scale-105 hover:bg-purple-700 transition-all duration-300 ease-in-out`}
              onClick={() => handleRoleSelect('Admin')}
            >
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-purple-500 bg-opacity-30 group-hover:bg-white group-hover:bg-opacity-20 mb-6 transition-all duration-200">
                <AdminIcon />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-200">Admin</h3>
              <p className="text-gray-300 text-center leading-relaxed group-hover:text-gray-100 transition-colors duration-200">
                Gain full control over the platform. Manage users, configure system settings, and ensure the smooth operation of VLaaS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;