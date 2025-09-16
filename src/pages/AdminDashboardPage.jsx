// src/pages/AdminDashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Icon for success/tick mark
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const AdminDashboardPage = ({ user: appUser }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminUID, setAdminUID] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [view, setView] = useState('initial'); // 'initial', 'signup-uid', 'signup-success', 'signin', 'forgot-password-uid', 'change-password-form', 'password-changed-success'
  const [message, setMessage] = useState('');
  const [tempPassword, setTempPassword] = useState(''); // To display generated password (signup)
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  // Check if admin is logged in from local storage on component mount
  useEffect(() => {
    const storedAdminUID = localStorage.getItem('currentAdminUID');
    if (storedAdminUID) {
      setAdminUID(storedAdminUID);
      setAdminLoggedIn(true);
      setView('dashboard');
    }
  }, []);

  // --- Utility Functions ---
  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  };

  // --- Event Handlers ---

  const handleSignUpUIDSubmit = (e) => {
    e.preventDefault();
    if (adminUID.trim() === '') {
      setMessage('Please enter a valid username/UID.');
      return;
    }
    
    // Check if UID already exists
    if (localStorage.getItem(`admin_pass_${adminUID}`)) {
      setMessage('This UID already exists. Please sign in or use a different UID.');
      return;
    }

    // Simulate API call to register admin and send password
    const generatedPass = generateRandomPassword();
    localStorage.setItem(`admin_pass_${adminUID}`, generatedPass); // Store password for this UID
    setMessage(`Account created. A random password has been 'sent' to your email associated with UID: ${adminUID}.`);
    setTempPassword(generatedPass); // Display it for demo purposes
    setView('signup-success');
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const storedPass = localStorage.getItem(`admin_pass_${adminUID}`);

    if (adminUID.trim() === '' || adminPassword.trim() === '') {
      setMessage('Please enter both UID/Username and Password.');
      return;
    }

    if (storedPass && storedPass === adminPassword) {
      localStorage.setItem('currentAdminUID', adminUID); // Mark this admin as currently logged in
      setAdminLoggedIn(true);
      setMessage('');
      setView('dashboard');
    } else {
      setMessage('Invalid UID or Password. Please try again or sign up.');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('currentAdminUID');
    setAdminLoggedIn(false);
    setAdminUID('');
    setAdminPassword('');
    setTempPassword('');
    setMessage('');
    setView('initial');
  };

  // --- Forgot Password Handlers ---

  const handleForgotPasswordUIDSubmit = (e) => {
    e.preventDefault();
    if (adminUID.trim() === '') {
      setMessage('Please enter your UID/Username to proceed.');
      return;
    }

    // Check if the UID exists locally
    if (localStorage.getItem(`admin_pass_${adminUID}`)) {
      setMessage(``);
      setView('change-password-form');
    } else {
      setMessage('UID not found. Please check your username or sign up.');
    }
    setAdminPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    // Update the password in local storage
    localStorage.setItem(`admin_pass_${adminUID}`, newPassword);
    setMessage('Your password has been successfully changed!');
    setView('password-changed-success');
    setAdminPassword('');
  };


  // --- UI Render Logic ---

  if (adminLoggedIn && view === 'dashboard') {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
        <h1 className="text-6xl font-extrabold text-indigo-400 mb-6">Admin Dashboard</h1>
        <p className="text-2xl text-gray-300 mb-8">Welcome, <strong className="text-indigo-300">{adminUID}</strong>! Manage platform settings and users.</p>

        {/* Placeholder for admin-specific content */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Platform Administration</h2>
          <ul className="text-lg text-gray-300 space-y-2">
            <li>Manage User Accounts</li>
            <li>System Configuration</li>
            <li>View Audit Logs</li>
          </ul>
          <button
            onClick={handleAdminLogout}
            className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            Logout from Admin Portal
          </button>
        </div>

        <Link to="/dashboard" className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 text-white transition-all duration-200 mt-4">
          Go Back to Role Selection
        </Link>
      </div>
    );
  }

  // Render authentication UI based on 'view' state
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        {view === 'initial' && (
          <>
            <h2 className="text-4xl font-bold text-white mb-6">Access Admin Portal</h2>
            <p className="text-gray-300 mb-8">Already have an account, or need to register?</p>
            <div className="space-y-4">
              <button
                onClick={() => { setAdminUID(''); setAdminPassword(''); setMessage(''); setView('signin'); }}
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => { setAdminUID(''); setAdminPassword(''); setMessage(''); setView('signup-uid'); }}
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
              >
                Sign Up
              </button>
            </div>
            <Link to="/dashboard" className="inline-block mt-8 text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              Back to Role Selection
            </Link>
          </>
        )}

        {/* Sign Up / Sign In Form */}
        {(view === 'signup-uid' || view === 'signin' || view === 'forgot-password-uid') && (
          <form onSubmit={
            view === 'signup-uid' ? handleSignUpUIDSubmit :
            view === 'signin' ? handleSignInSubmit :
            handleForgotPasswordUIDSubmit
          } className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-6">
              {view === 'signup-uid' ? 'Admin Registration' :
                view === 'signin' ? 'Admin Login' : 'Forgot Password?'}
            </h2>
            <p className="text-gray-400 mb-4">
              {view === 'signup-uid' ? 'Enter your desired username/UID to receive a password.' :
                view === 'signin' ? 'Enter your username/UID and password.' :
                'Enter your username/UID to reset your password.'}
            </p>

            <div>
              <label htmlFor="adminUID" className="sr-only">Username / UID</label>
              <input
                type="text"
                id="adminUID"
                placeholder="Enter Username / UID"
                value={adminUID}
                onChange={(e) => { setAdminUID(e.target.value); setMessage(''); }}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {view === 'signin' && (
              <div>
                <label htmlFor="adminPassword" className="sr-only">Password</label>
                <input
                  type="password"
                  id="adminPassword"
                  placeholder="Enter Password"
                  value={adminPassword}
                  onChange={(e) => { setAdminPassword(e.target.value); setMessage(''); }}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}

            {message && <p className={`mt-4 ${view === 'forgot-password-uid' ? 'text-blue-400' : 'text-red-400'}`}>{message}</p>}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
            >
              {view === 'signup-uid' ? 'Confirm and Get Password' :
                view === 'signin' ? 'Login' : 'Reset Password'}
            </button>

            {view === 'signin' && (
              <button
                type="button"
                onClick={() => { setAdminPassword(''); setMessage(''); setView('forgot-password-uid'); }}
                className="w-full mt-2 text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                Forgot Password?
              </button>
            )}

            <button
              type="button"
              onClick={() => { setAdminUID(''); setAdminPassword(''); setNewPassword(''); setConfirmNewPassword(''); setMessage(''); setView('initial'); }}
              className="w-full px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg shadow-md transition-all duration-200"
            >
              Back
            </button>
          </form>
        )}

        {view === 'signup-success' && (
          <div className="p-4">
            <CheckCircleIcon />
            <h2 className="text-4xl font-bold text-green-400 mb-4">Success!</h2>
            {message && <p className="text-lg text-green-300 mb-4">{message}</p>}
            <p className="text-lg text-gray-400 mb-6">
              Your generated password is: <strong className="text-green-300 select-all">{tempPassword}</strong>
            </p>
            <p className="text-md text-gray-400 mb-8">
              **Important:** Please log in with your UID and this password. You can change your password later.
            </p>
            <button
              onClick={() => { setAdminPassword(''); setMessage(''); setView('signin'); }}
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
            >
              Proceed to Login
            </button>
            <Link to="/dashboard" className="inline-block mt-8 text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              Back to Role Selection
            </Link>
          </div>
        )}

        {view === 'password-changed-success' && (
          <div className="p-4">
            <CheckCircleIcon />
            <h2 className="text-4xl font-bold text-green-400 mb-4">Password Changed!</h2>
            <p className="text-lg text-green-300 mb-4">{message}</p>
            <button
              onClick={() => { setAdminPassword(''); setMessage(''); setView('signin'); }}
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
            >
              Proceed to Login
            </button>
            <Link to="/dashboard" className="inline-block mt-8 text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              Back to Role Selection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;