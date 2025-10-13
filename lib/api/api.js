import axios from "axios";

const isServer = typeof window === "undefined"

const api = axios.create({
 baseURL: isServer
    ? process.env.NEXT_PUBLIC_API_BASE_URL + "/api"
    : "/api",
  headers : {"Content-Type" : "application/json"},                    // En local → proxy vite
  withCredentials: true,
 
});

export default api;
