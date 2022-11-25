import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_VTS_API,
  timeout: 30000,
});

export default api;
