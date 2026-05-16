import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add token before every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    console.log(response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.message) {
      toast.success(response.data.message, { duration: 3000, });
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast.error(error.response.data.message, { duration: 3000 });
    return Promise.reject(error);
  },
);

export default api;
