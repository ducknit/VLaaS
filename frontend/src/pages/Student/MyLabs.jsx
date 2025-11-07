import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function MyLabs() {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    api.get("/student/labs").then((res) => setLabs(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h2>My Labs</h2>
      <ul>
        {labs.map((lab) => (
          <li key={lab._id}>
            <Link to={`/student/labs/${lab._id}`}>{lab.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
