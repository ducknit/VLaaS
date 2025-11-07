import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(form);
      setMsg("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMsg("Error creating account. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full p-2 mb-3 border border-gray-300 rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 mb-3 border border-gray-300 rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 mb-3 border border-gray-300 rounded" />
        <select name="role" onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded">
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Create Account</button>
        {msg && <p className="text-center text-sm mt-3">{msg}</p>}
      </form>
    </div>
  );
}
