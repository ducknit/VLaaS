// src/pages/StudentDashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Icon for success/tick mark
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const StudentDashboardPage = ({ user: appUser }) => {
  const [studentLoggedIn, setStudentLoggedIn] = useState(false);
  const [studentUID, setStudentUID] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [view, setView] = useState('initial'); // 'initial', 'signup-uid', 'signup-success', 'signin', 'forgot-password-uid', 'change-password-form', 'password-changed-success'
  const [message, setMessage] = useState('');
  const [tempPassword, setTempPassword] = useState(''); // To display generated password (signup)
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  // Check if student is logged in from local storage on component mount
  useEffect(() => {
    const storedStudentUID = localStorage.getItem('currentStudentUID');
    if (storedStudentUID) {
      setStudentUID(storedStudentUID);
      setStudentLoggedIn(true);
      setView('dashboard');
    }
  }, []);

  // --- Utility Functions ---
  const generateRandomPassword = () => {
    // Stronger random string
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  };

  // --- Event Handlers ---

  const handleSignUpUIDSubmit = (e) => {
    e.preventDefault();
    if (studentUID.trim() === '') {
      setMessage('Please enter a valid username/UID.');
      return;
    }
    
    // Check if UID already exists
    if (localStorage.getItem(`student_pass_${studentUID}`)) {
      setMessage('This UID already exists. Please sign in or use a different UID.');
      return;
    }

    // Simulate API call to register student and send password
    const generatedPass = generateRandomPassword();
    localStorage.setItem(`student_pass_${studentUID}`, generatedPass); // Store password for this UID
    setMessage(`Account created. A random password has been 'sent' to your email associated with UID: ${studentUID}.`);
    setTempPassword(generatedPass); // Display it for demo purposes
    setView('signup-success');
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const storedPass = localStorage.getItem(`student_pass_${studentUID}`);

    if (studentUID.trim() === '' || studentPassword.trim() === '') {
      setMessage('Please enter both UID/Username and Password.');
      return;
    }

    if (storedPass && storedPass === studentPassword) {
      localStorage.setItem('currentStudentUID', studentUID); // Mark this student as currently logged in
      setStudentLoggedIn(true);
      setMessage('');
      setView('dashboard');
    } else {
      setMessage('Invalid UID or Password. Please try again or sign up.');
    }
  };

  const handleStudentLogout = () => {
    localStorage.removeItem('currentStudentUID');
    setStudentLoggedIn(false);
    setStudentUID('');
    setStudentPassword('');
    setTempPassword('');
    setMessage('');
    setView('initial');
  };

  // --- Forgot Password Handlers ---

  const handleForgotPasswordUIDSubmit = (e) => {
    e.preventDefault();
    if (studentUID.trim() === '') {
      setMessage('Please enter your UID/Username to proceed.');
      return;
    }

    // In a real app, you'd send an email with a reset link.
    // Here, we'll check if the UID exists locally to simulate a valid user.
    if (localStorage.getItem(`student_pass_${studentUID}`)) {
      // Simulate "email sent" and allow them to proceed to change password
      setMessage(``);
      setView('change-password-form'); // Move to the change password form directly
    } else {
      setMessage('UID not found. Please check your username or sign up.');
    }
    // Clear password fields
    setStudentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) { // Basic password strength
      setMessage('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    // Update the password in local storage
    localStorage.setItem(`student_pass_${studentUID}`, newPassword);
    setMessage('Your password has been successfully changed!');
    setView('password-changed-success');
    setStudentPassword(''); // Clear the old password field
  };


  // --- UI Render Logic ---

  if (studentLoggedIn && view === 'dashboard') {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-8">
        <h1 className="text-6xl font-extrabold text-indigo-400 mb-6">Student Dashboard</h1>
        <p className="text-2xl text-gray-300 mb-8">Welcome, <strong className="text-indigo-300">{studentUID}</strong>! Here are your labs and assignments.</p>

        {/* Placeholder for student-specific content */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Your Courses</h2>
          <ul className="text-lg text-gray-300 space-y-2">
            <li>Introduction to Virtual Labs</li>
            <li>Advanced Networking Simulations</li>
            <li>Cloud Computing Fundamentals</li>
          </ul>
          <button
            onClick={handleStudentLogout}
            className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            Logout from Student Portal
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
            <h2 className="text-4xl font-bold text-white mb-6">Access Student Portal</h2>
            <p className="text-gray-300 mb-8">Already have an account, or need to register?</p>
            <div className="space-y-4">
              <button
                onClick={() => { setStudentUID(''); setStudentPassword(''); setMessage(''); setView('signin'); }}
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => { setStudentUID(''); setStudentPassword(''); setMessage(''); setView('signup-uid'); }}
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
              {view === 'signup-uid' ? 'Student Registration' :
                view === 'signin' ? 'Student Login' : 'Forgot Password?'}
            </h2>
            <p className="text-gray-400 mb-4">
              {view === 'signup-uid' ? 'Enter your desired username/UID to receive a password.' :
                view === 'signin' ? 'Enter your username/UID and password.' :
                'Enter your username/UID to reset your password.'}
            </p>

            <div>
              <label htmlFor="studentUID" className="sr-only">Username / UID</label>
              <input
                type="text"
                id="studentUID"
                placeholder="Enter Username / UID"
                value={studentUID}
                onChange={(e) => { setStudentUID(e.target.value); setMessage(''); }}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {view === 'signin' && (
              <div>
                <label htmlFor="studentPassword" className="sr-only">Password</label>
                <input
                  type="password"
                  id="studentPassword"
                  placeholder="Enter Password"
                  value={studentPassword}
                  onChange={(e) => { setStudentPassword(e.target.value); setMessage(''); }}
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

            {view === 'signin' && ( // "Forgot Password" link visible only on sign-in form
              <button
                type="button"
                onClick={() => { setStudentPassword(''); setMessage(''); setView('forgot-password-uid'); }}
                className="w-full mt-2 text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                Forgot Password?
              </button>
            )}

            <button
              type="button"
              onClick={() => { setStudentUID(''); setStudentPassword(''); setNewPassword(''); setConfirmNewPassword(''); setMessage(''); setView('initial'); }}
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
              onClick={() => { setStudentPassword(''); setMessage(''); setView('signin'); }}
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
            >
              Proceed to Login
            </button>
            <Link to="/dashboard" className="inline-block mt-8 text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              Back to Role Selection
            </Link>
          </div>
        )}

        {view === 'change-password-form' && (
          <form onSubmit={handleChangePasswordSubmit} className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-6">Change Password</h2>
            <p className="text-gray-400 mb-4">
              Enter your new password for <strong className="text-indigo-300">{studentUID}</strong>.
            </p>
            
            <div>
              <label htmlFor="newPassword" className="sr-only">New Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setMessage(''); }}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="sr-only">Confirm New Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => { setConfirmNewPassword(e.target.value); setMessage(''); }}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {message && <p className="text-red-400 mt-4">{message}</p>}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
            >
              Change Password
            </button>
            <button
              type="button"
              onClick={() => { setStudentUID(''); setStudentPassword(''); setNewPassword(''); setConfirmNewPassword(''); setMessage(''); setView('initial'); }}
              className="w-full px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg shadow-md transition-all duration-200"
            >
              Cancel
            </button>
          </form>
        )}

        {view === 'password-changed-success' && (
          <div className="p-4">
            <CheckCircleIcon />
            <h2 className="text-4xl font-bold text-green-400 mb-4">Password Changed!</h2>
            <p className="text-lg text-green-300 mb-4">{message}</p>
            <button
              onClick={() => { setStudentPassword(''); setMessage(''); setView('signin'); }}
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

export default StudentDashboardPage;