import axios from "axios";

import Auth from "../Auth";
import Config from "../Config";

const Http = axios.create({
  baseURL: Config.get("api_endpoint"),
});

Http.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

Http.setAuthorization = (token) => {
  Http.defaults.headers["Authorization"] = token;
  return Http;
};

Http.formData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return formData;
};

Http.interceptors.request.use(
  (config) => {
    if (Auth.isLogged()) {
      config.headers["Authorization"] = `Bearer ${Auth.getToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      Auth.logout();
    }
    return Promise.reject(error);
  }
);

export default Http;
