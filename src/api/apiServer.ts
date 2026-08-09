import axios from "axios";

const apiServer = axios.create({
    // baseURL: 'http://localhost:3010/'
    baseURL: 'https://api.granja.infinitozh.com/'
})

apiServer.interceptors.request.use((config) => {
    // const access_token: string = 'valid_token'
    //
    // if (access_token) {
    //     config.headers.Authorization = `Bearer ${access_token}`
    // }

    return config
}, (error) => {
    return Promise.reject(error)
})

export default apiServer