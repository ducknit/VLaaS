// src/HomePage.jsx
import React from 'react';

function HomePage({ user, setUser }) {
  const handleLogout = () => {
    // Clear the user state to log them out
    setUser(null);
  };

  if (!user) {
    // This should not happen if routing is set up correctly, but it's a good safeguard.
    return <h2>You are not logged in!</h2>;
  }

  return (
    <div>
      {/* The user object from Google contains 'name', 'email', and 'picture' */}
      <img src={user.picture} alt="User avatar" style={{ borderRadius: '50%' }} />
      <h1>Hello, {user.name}</h1>
      <p>Your email is: <strong>{user.email}</strong></p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;