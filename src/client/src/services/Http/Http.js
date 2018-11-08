import axios from "axios";
import buildURL from "axios/lib/helpers/buildURL";
import Config from "../Config";

const Http = axios.create({
  baseURL: Config.get("api_endpoint")
});

Http.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

Http.setAuthorization = token => {
  Http.defaults.headers.common["Authorization"] = token;
  return Http;
};

Http.formData = data => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  return formData;
};

Http.buildURL = buildURL;

export default Http;
