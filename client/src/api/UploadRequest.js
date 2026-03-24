import axios from "axios";

// ✅ create API instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ✅ upload image
export const uploadImage = (data) => {
  return API.post("/upload", data);
};

// ✅ upload post
export const uploadPost = (data) => {
  return API.post("/post", data);
};