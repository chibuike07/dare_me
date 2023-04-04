import axios from "axios";

export const CustomAxios = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  baseURL: "http://localhost:3003",
});
