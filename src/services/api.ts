import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.bitpin.ir",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default instance;
