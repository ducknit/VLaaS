import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Submissions() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get("/instructor/submissions").then((res) => setSubs(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h2>Lab Submissions</h2>
      <ul>
        {subs.map((s) => (
          <li key={s._id}>
            {s.studentName} submitted <strong>{s.labTitle}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
