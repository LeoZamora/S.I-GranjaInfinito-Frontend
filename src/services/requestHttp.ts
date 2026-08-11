import apiServer from "../api/apiServer";
import type { Login } from "../common/interfaces/interfaces";
import { endPoints } from "../api/endPoints";
import axios from "axios";
import type {
    porcinosPagination,
    CreateEjemplar,
    insumosPagination,
    CreateProducto
} from "../common/types/apiTypes.ts";

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
                access_token: response.data?.datos.token,
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
            const response = await apiServer.post(endPoints.getEjemplares, data)
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

    async putEjemplar(data: CreateEjemplar, id: number) {
        try {
            const response = await apiServer.put(`${endPoints.postEjemplare}/${id}`, data)
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


    async postImgEjemplar(foto: FormData, id: number) {
        try {
            const response = await apiServer.post(`${endPoints.postEjemplare}/${id}/imagen`, foto, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
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

    async getEjemplarById(id: number) {
        try {
            const response = await apiServer.get(`${endPoints.getEjemplarById}/${id}`)

            return {
                code: response.status,
                data: response.data.datos,
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
    
    // INSUMOS
    async getInsumos(data: insumosPagination) {
        try {
            const response = await apiServer.post(endPoints.getInsumos, data)
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


    async postProducto(data: CreateProducto) {
        try {
            const response = await apiServer.post(endPoints.postInsumos, data)
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

    async putProducto(data: CreateProducto, id: number) {
        try {
            const response = await apiServer.put(`${endPoints.postInsumos}/${id}`, data)
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


    async postImgProducto(foto: FormData, id: number) {
        try {
            const response = await apiServer.post(`${endPoints.postInsumos}/${id}/imagen`, foto, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
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

    async getSubCategorias(id: number) {
        try {
            const response = await apiServer.get(`${endPoints.getSubCategoriaProdCbx}?idCatProducto=${id}`)

            return {
                code: response.status,
                data: response.data.datos,
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

    async getProductoById(id: number) {
        try {
            const response = await apiServer.get(`${endPoints.getInsumosById}/${id}`)

            return {
                code: response.status,
                data: response.data.datos,
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