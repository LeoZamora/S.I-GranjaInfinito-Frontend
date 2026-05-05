import apiServer from "../api/apiServer";
import type { Login } from "../common/interfaces/interfaces";
import { endPoints } from "../api/endPoints";
import axios from "axios";

export default class RequestHttp {
    constructor() {}

    async getData(url: string) {
        return (await apiServer.get(url))
    }

    async postLogin(data: Login) {
        try {
            const result = await apiServer.post(endPoints.postLogin, data)
            return {
                code: result.status,
                access_token: result.data?.access_token,
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
}