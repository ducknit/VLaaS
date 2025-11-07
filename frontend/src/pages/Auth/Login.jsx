import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle redirect after successful Google login
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const role = params.get("role");
    const name = params.get("name");
    const email = params.get("email");

    if (token && role) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email, role }));
      login({ name, email, role });
      navigate(`/${role}`);
    }
  }, []);

  const handleGoogleLogin = () => {
    // Redirect user to backend Google auth route
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-80 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login with Google</h2>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 border border-gray-300 rounded py-2 w-full hover:bg-gray-100"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
