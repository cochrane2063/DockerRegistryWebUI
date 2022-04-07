import axios from "axios";

const axiosAlt = (url: string) => {
  return axios.create({
    baseURL: url + "/v2"
  })
};

export default axiosAlt(process.env.REGISTRY_URL ? process.env.REGISTRY_URL : "");

export { axiosAlt };