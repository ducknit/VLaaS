import { useRole } from "../context/RoleContext";
export default function useRoleHook() {
  const { role, setRole } = useRole();
  return { role, setRole };
}
