import axios from "axios";

const instance = axios.create({
    baseURL: 'https://threedtback.onrender.com/api',
    withCredentials: true
})
export default instance