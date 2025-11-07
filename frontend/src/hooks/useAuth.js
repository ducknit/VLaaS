import { useAuth } from "../context/AuthContext";

export default function useAuthHook() {
  const { user, login, logout, loading } = useAuth();
  return { user, login, logout, loading };
}
