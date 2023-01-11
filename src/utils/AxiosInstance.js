import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: `https://cvidpro.herokuapp.com/`,
  baseURL: `http://localhost:3030/`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.params = config.params || {};
  config.headers["Authorization"] = "Basic " + token;
  return config;
});

export default axiosInstance;
