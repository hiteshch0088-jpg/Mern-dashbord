import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-dashbord.onrender.com",
});

export default API;