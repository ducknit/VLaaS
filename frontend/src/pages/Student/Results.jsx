import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/student/results").then((res) => setResults(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h2>My Results</h2>
      <ul>
        {results.map((r) => (
          <li key={r._id}>{r.labTitle}: {r.score}%</li>
        ))}
      </ul>
    </div>
  );
}
