import axios from "axios";

const api = axios.create({
  baseURL: "http://16.171.151.203/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  }
});

export default api;