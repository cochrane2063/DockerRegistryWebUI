import axios from "axios";

const axiosAlt = (url: string) => {
  return axios.create({
    baseURL: url + "/v2"
  })
};

export default axiosAlt(process.env.REACT_APP_REGISTRY_URL ? process.env.REACT_APP_REGISTRY_URL : "");

export { axiosAlt };