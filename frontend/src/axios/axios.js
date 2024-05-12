import axios from "axios";

const userToken = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:4000",
});
if (userToken) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
}

export default instance;
