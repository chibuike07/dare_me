import axios from "axios";

export const CustomAxios = axios.create({
  baseURL: "http://localhost:3003",
});

CustomAxios.interceptors.response.use(
  (response) => {
    if (response.data.code < 200 || response.data.code > 399)
      return Promise.reject(response.data.msg);
    return response;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.msg) || "مشکلی پیش امده است"
    )
);
