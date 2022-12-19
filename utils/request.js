import axios from "axios";
import {getToken} from "./auth";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS"
axios.defaults.headers["Access-Control-Allow-Headers"] = "*"
const backendBaseURL = process.env.NEXT_PUBLIC_BASE_API

const service = axios.create({
    baseURL: backendBaseURL,
    timeout: 1000 * 120
})


service.interceptors.request.use(
    (requestConfig) => {
        if (getToken()) {
            requestConfig.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return requestConfig
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        return response.data
    }
)

export default service