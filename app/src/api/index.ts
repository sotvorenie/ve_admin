import axios, {AxiosRequestConfig} from 'axios'

import {logout} from "@utils/auth.ts";

import useApiUrlStore from "@store/useApiUrlStore.ts";

export const client = axios.create({
    timeout: 10000,
})

client.interceptors.request.use((config) => {
    const apiUrlStore = useApiUrlStore()
    const baseUrl = apiUrlStore.activeUrl || import.meta.env.VITE_API_ADMIN_URL
    config.baseURL = `${baseUrl}/api`

    const token = localStorage.getItem('token')

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})
client.interceptors.response.use(
    response => response,
    async error => {
        if (axios.isCancel(error) || error.code === 'ERR_CANCELED') return { data: null, detail: 'canceled' as const }

        if (error.response?.status === 401 && error.response?.data?.code === 'JWT_INVALID') {
            logout()
            return { data: null, detail: 'canceled' as const }
        }

        if (error.response?.status === 404) {
            const errorData = error.response?.data || { detail: "404: Ресурс не найден" }
            return Promise.reject(errorData)
        }

        const errorData = error.response?.data || { detail: error.message || "Ошибка сети" }
        return Promise.reject(errorData)
    },
)

export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await client.get(url, config)
    return res.data as T
}

export const apiCheckMeGet = async <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<T> => {
    const baseUrl = import.meta.env.VITE_API_ADMIN_URL
    const res = await client.get<T>(url, {
        ...config,
        baseURL: `${baseUrl}/api`,
    })
    return res.data
}


export const apiPost = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
): Promise<T> => {
    const res = await client.post(url, data, config)
    return res.data as T
}

export const apiPatch = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
): Promise<T> => {
    const res = await client.patch(url, data, config)
    return res.data as T
}

export const apiDelete = async <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<T> => {
    const res = await client.delete(url, config)
    return res.data as T
}