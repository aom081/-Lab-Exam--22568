import { create } from "zustand";
import api from "../api";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/tasks");
      set({ tasks: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch tasks",
        loading: false,
      });
    }
  },

  createTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/tasks", taskData);
      set({ tasks: [res.data, ...get().tasks], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create task",
        loading: false,
      });
    }
  },

  updateTask: async (id, taskData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`/tasks/${id}`, taskData);
      set({
        tasks: get().tasks.map((task) => (task._id === id ? res.data : task)),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update task",
        loading: false,
      });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/tasks/${id}`);
      set({
        tasks: get().tasks.filter((task) => task._id !== id),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete task",
        loading: false,
      });
    }
  },
}));
