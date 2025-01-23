import axios from "axios";

const API = axios.create({
    // baseURL:"http://localhost:3001",
    // baseURL:"http://10.0.2.2:3001",
    baseURL:"http://192.168.30.107:3001",
    timeout: 1000
});

export default API;
