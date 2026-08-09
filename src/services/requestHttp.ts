import apiServer from "../api/apiServer";
import type { Login } from "../common/interfaces/interfaces";
import { endPoints } from "../api/endPoints";
import axios from "axios";
import type {porcinosPagination, CreateEjemplar} from "../common/types/apiTypes.ts";

export default class RequestHttp {
    constructor() {}

    async getData(url: string) {
        return (await apiServer.get(url))
    }

    async postLogin(data: Login) {
        try {
            const response = await apiServer.post(endPoints.postLogin, data)
            return {
                code: response.status,
                access_token: response.data?.access_token,
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return {
                    code: error?.response?.status,
                    msg: error?.response?.data.message,
                }
            }
        }
    }

    async getItemsCombobox(url: string) {
        try {
            const response = await apiServer.get(`${url}`)

            return {
                code: response.status,
                data: response.data.datos || [],
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return {
                    code: error?.response?.status ?? 500,
                    msg: error?.response?.data.message,
                }
            }
        }
    }

    async getPorcinos(data: porcinosPagination) {
        try {
            const response = await apiServer.post(endPoints.postLogin, data)
            return {
                code: response.status,
                data: response.data,
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return {
                    code: error?.response?.status,
                    msg: error?.response?.data.message,
                }
            }
        }
    }

    async postEjemplar(data: CreateEjemplar) {
        try {
            const response = await apiServer.post(endPoints.postEjemplare, data)
            return {
                code: response.status,
                data: response.data,
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return {
                    code: error?.response?.status,
                    msg: error?.response?.data.message,
                }
            }
        }
    }

    async getEjemplarById(code: string) {
        try {
            const response = await apiServer.get(`${endPoints.getEjemplarById}/${code}`)

            return {
                code: response.status,
                data: response.data,
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return {
                    code: error?.response?.status ?? 500,
                    msg: error?.response?.data.message,
                }
            }
        }
    }
}