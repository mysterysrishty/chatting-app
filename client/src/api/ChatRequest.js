import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getUserChats = (userId) =>
  API.get(`/chat/${userId}`);

export const createChat = (data) =>
  API.post("/chat", data);