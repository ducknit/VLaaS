// src/LoginPage.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setUser }) {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    // Decode the JWT credential
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    
    // Set the user state in the parent component
    setUser(decoded);
    
    // Navigate to the home page
    navigate('/');
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      <h2>Sign In / Sign Up</h2>
      <p>Please sign in with your Google account to continue.</p>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}

export default LoginPage;