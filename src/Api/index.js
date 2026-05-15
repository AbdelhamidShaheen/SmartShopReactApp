import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    'Accept': "application/json", 
    'Authorization': localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : null,
  },
});

export default api;

