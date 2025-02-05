import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:3001",
    //baseURL:"http://10.0.2.2:3001",
    //baseURL:"http://172.20.10.4:3001",
    timeout: 1000
});

export default API;
