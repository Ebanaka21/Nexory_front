// src/api/axios.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8002/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
}

// при старте приложения — подставим, если в localStorage есть токен
const stored = localStorage.getItem("token");
if (stored) {
  api.defaults.headers.common["Authorization"] = `Bearer ${stored}`;
}

export default api;
