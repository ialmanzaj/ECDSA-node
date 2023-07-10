import axios from "axios";

const server = axios.create({
  baseURL: "https://ecdsa-node-server-seven.vercel.app",
});

export default server;
