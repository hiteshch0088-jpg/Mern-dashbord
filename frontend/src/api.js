import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-dashboard-api.onrender.com",
});

export default API;