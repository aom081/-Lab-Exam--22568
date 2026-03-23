import { create } from "zustand";
import api from "../api";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
      throw error;
    }
  },

  register: async (username, password) => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/register", { username, password });
      set({ loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed",
        loading: false,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    if (!localStorage.getItem("token")) return;
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("token");
    }
  },
}));
