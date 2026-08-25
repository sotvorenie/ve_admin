import axios from 'axios'

import {logout} from "../utils/auth.ts";

const client = axios.create({
    baseURL: 'http://localhost:81',
    timeout: 10000,
})

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})
client.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            logout()
        }
        return Promise.reject(error)
    }
)

export const apiGet = async <T>(url: string, params?: any, signal?: AbortSignal): Promise<T> => {
    const res = await client.get(url, { params, signal })
    return res.data as T
}

export const apiPost = async <T>(
    url: string,
    data?: any,
    config?: any,
    signal?: AbortSignal
): Promise<T> => {
    const finalConfig = { ...config, signal }
    const res = await client.post(url, data, finalConfig)
    return res.data as T
}

export const apiPatch = async <T>(
    url: string,
    data?: any,
    config?: any,
    signal?: AbortSignal
): Promise<T> => {
    const finalConfig = {
        ...config,
        signal,
    }
    const res = await client.patch(url, data, finalConfig)
    return res.data as T
}