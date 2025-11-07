import { useEffect, useState } from "react";
import api from "../services/api";

export default function useFetch(endpoint, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api.get(endpoint)
      .then((res) => active && setData(res.data))
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => (active = false);
  }, deps);

  return { data, loading, error };
}
