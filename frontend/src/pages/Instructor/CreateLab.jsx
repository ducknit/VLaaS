import React, { useState } from "react";
import api from "../../services/api";

export default function CreateLab() {
  const [lab, setLab] = useState({ title: "", description: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setLab({ ...lab, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/instructor/labs", lab);
      setMsg("Lab created successfully!");
      setLab({ title: "", description: "" });
    } catch {
      setMsg("Error creating lab");
    }
  };

  return (
    <div>
      <h2>Create New Lab</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Lab Title" value={lab.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Lab Description" value={lab.description} onChange={handleChange} required />
        <button type="submit">Create</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
