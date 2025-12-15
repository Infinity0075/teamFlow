import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5002/api" : "/api";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
