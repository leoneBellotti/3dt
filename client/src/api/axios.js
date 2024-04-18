import axios from "axios";

const instance = axios.create({
    baseURL: 'https://threedtback.onrender.com/',
    withCredentials: true
})
export default instance