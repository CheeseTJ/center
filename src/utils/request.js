import axios from "axios";
const mode = import.meta.env.MODE;
const request = axios.create({
    baseURL:mode==='development' ? null : "https://api.aag.moe",
});

export default request