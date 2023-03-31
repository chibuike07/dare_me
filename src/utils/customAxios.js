import axios from "axios";

export const CustomAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3000",
});
