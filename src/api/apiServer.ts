import axios from "axios";
import {useStore} from "../store.ts";

const apiServer = axios.create({
    // baseURL: 'http://localhost:3010/'
    baseURL: 'https://api.granja.infinitozh.com/'
})

const store = useStore();

apiServer.interceptors.request.use((config) => {
    // const access_token: string = 'valid_token'

    if (store.access_token) {
        config.headers.Authorization = `Bearer ${store.access_token}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

export default apiServer