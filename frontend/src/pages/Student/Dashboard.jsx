import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ------------------------------------------------------------
  // ✅ 1. Extract JWT from URL or load from localStorage
  // ------------------------------------------------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      console.log("✅ Token from URL:", tokenFromUrl);
      localStorage.setItem("vlaas_token", tokenFromUrl);
      setToken(tokenFromUrl);

      // Clean URL (remove ?token=...)
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const storedToken = localStorage.getItem("vlaas_token");
      if (storedToken && storedToken !== "[object Object]") {
        console.log("✅ Token from localStorage:", storedToken);
        setToken(storedToken);
      } else {
        console.warn("⚠️ No valid token found. Please log in again.");
        setError("You are not logged in. Please log in again.");
      }
    }
  }, []);

  // ------------------------------------------------------------
  // ✅ 2. Fetch labs (protected route)
  // ------------------------------------------------------------
  useEffect(() => {
    if (!token) return;

    const fetchLabs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/labs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLabs(res.data.labs || []);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching labs:", err.response || err);
        if (err.response?.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError("Failed to fetch labs. Try again later.");
        }
      }
    };

    fetchLabs();
  }, [token]);

  // ------------------------------------------------------------
  // ✅ 3. Start a lab session
  // ------------------------------------------------------------
  const startLab = async (labId) => {
    if (!token) return alert("You are not logged in!");
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/labs/sessions`,
        { labId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`✅ Lab started! Open: ${res.data.session.url}`);
    } catch (err) {
      console.error("❌ Error starting lab:", err.response || err);
      if (err.response?.status === 401) {
        alert("Unauthorized. Please log in again.");
      } else {
        alert("Failed to start lab session.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // ✅ 4. Logout handler
  // ------------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("vlaas_token");
    setToken(null);
    setLabs([]);
    setError("You are not logged in. Please log in again.");
    window.location.href = "/login";
  };

  // ------------------------------------------------------------
  // ✅ 5. Render
  // ------------------------------------------------------------
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <p className="mb-4 text-gray-700">
        Welcome to VLaaS! Access and launch your labs below:
      </p>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <div className="space-y-3">
        {labs.length === 0 && !error && (
          <p className="text-gray-500">Loading labs or not logged in...</p>
        )}

        {labs.map((lab) => (
          <div
            key={lab.id}
            className="border rounded p-3 flex justify-between items-center shadow-sm"
          >
            <span>
              <strong>{lab.name}</strong> — {lab.description}
            </span>
            <button
              onClick={() => startLab(lab.id)}
              disabled={loading}
              className={`px-3 py-1 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Starting..." : "Start Lab"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
 