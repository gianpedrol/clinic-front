import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/clinic-management-api/public/api/"
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  //  alert(token);d
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
});

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    console.log(error);

    if (error?.response?.status === 401) {
      window.location.pathname = "/dashboard";

      if (
        (window.location.pathname = "/dashboard" && error?.response?.status === 401)
      ) {
        window.location.pathname = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
