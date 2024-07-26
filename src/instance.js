import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3003",
  baseURL: "https://sz-be.vercel.app/",
});

export default instance;
