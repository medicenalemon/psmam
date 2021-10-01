import axios from "axios";
import { getKey, clear, localStorageConst } from "./asyncStorage";

// Create axios client, pre-configured with baseURL
const instance = axios.create({
  baseURL: `http://6a69-181-94-254-32.ngrok.io/api`,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getKey(localStorageConst.TOKEN);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response === undefined || error.response.status === 401) {
      clear();
      window.location = "/login";
    }
    if (error.response.data?.detail) return Promise.reject(error.response.data);

    return Promise.reject(error);
  }
);

const get = instance.get;
const post = instance.post;
const put = instance.put;
const del = instance.delete;

export { get, post, put, del };
