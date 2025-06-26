import axios from "axios";

export const api = axios.create({
  baseURL: "https://demo.aj-nusantara.com/manajemen-aset-api-mangutama",
  // baseURL: "/api/",
});

export default api;
