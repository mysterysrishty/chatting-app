import axios from "axios";

// ✅ fallback added (CRITICAL)
const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://srishty-social-backend.onrender.com",
});

export const logIn = (formData) =>
  API.post("/auth/login", formData);

export const signUp = (formData) =>
  API.post("/auth/register", formData);