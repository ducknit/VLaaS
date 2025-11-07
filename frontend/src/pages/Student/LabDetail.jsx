import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function LabDetail() {
  const { id } = useParams();
  const [lab, setLab] = useState(null);

  useEffect(() => {
    api.get(`/student/labs/${id}`).then((res) => setLab(res.data)).catch(() => {});
  }, [id]);

  if (!lab) return <p>Loading...</p>;

  return (
    <div>
      <h2>{lab.title}</h2>
      <p>{lab.description}</p>
    </div>
  );
}
