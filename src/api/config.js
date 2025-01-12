import axios from "axios";

const API = axios.create({
    baseURL:"http://192.168.30.107:3001",
    timeout: 1000,
});

export default API;