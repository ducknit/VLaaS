import api from "./api";

const authService = {
  login: async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    // Expected: { user, token }
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  },

  signup: async (payload) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getStoredUser: () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
};

export default authService;
