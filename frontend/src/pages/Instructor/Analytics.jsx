import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/instructor/analytics").then((res) => setStats(res.data)).catch(() => {});
  }, []);

  if (!stats) return <p>Loading analytics...</p>;

  return (
    <div>
      <h2>Instructor Analytics</h2>
      <p>Total Labs Created: {stats.totalLabs}</p>
      <p>Total Submissions: {stats.totalSubmissions}</p>
    </div>
  );
}
