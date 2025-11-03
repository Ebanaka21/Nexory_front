import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "Cache-Control": "no-cache" },
  withCredentials: true, // если используем сессии/куки
});

export default instance;
