// src/utils/auth.ts
import api, { setAuthToken } from "../api/axios";
import type { User } from "../types/types";

export async function checkAuth(): Promise<User | null> {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    setAuthToken(token);
    const { data } = await api.get("/me");
    return data;
  } catch (e) {
    // token invalid
    setAuthToken(null);
    localStorage.removeItem("token");
    return null;
  }
}

export function logout() {
  const token = localStorage.getItem("token");
  if (!token) {
    setAuthToken(null);
    localStorage.removeItem("token");
    return;
  }
  // fire-and-forget logout
  api.post("/logout").catch(()=>{});
  setAuthToken(null);
  localStorage.removeItem("token");
}
