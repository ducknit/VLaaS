import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/admin/reports").then((res) => setReports(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      <p>List of analytics and lab usage data:</p>
      <ul>
        {reports.map((r, i) => (
          <li key={i}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}
