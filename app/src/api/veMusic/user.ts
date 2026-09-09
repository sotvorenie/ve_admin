import {AppUsersResponseType, AppUserType} from "@/types/user.ts";
import {UrlType} from "@/types/url.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const apiGetAllUsers = async (page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<AppUsersResponseType> => {
    return apiGet(`/user/all?page=${page}&limit=${limit}`, {signal})
}

export const apiGetUser = async (id: number, signal?: AbortSignal): Promise<AppUserType> => {
    return apiGet(`/user/${id}`,{signal})
}

export const apiRedactUserName = async (id: number, name: string, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/user/redact_name/${id}`,{name}, {signal})
}

export const apiRedactUserLogin = async (id: number, login: string, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/user/redact_login/${id}`,{login}, {signal})
}

export const apiRedactUserPassword = async (id: number, password: string, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/user/redact_password/${id}`,{password}, {signal})
}

export const apiDeleteUser = async (id: number, signal?: AbortSignal): Promise<void> => {
    return apiDelete(`/user/delete/${id}`,{signal})
}

export const apiUploadUserAvatar = async (id: number, file: File, signal?: AbortSignal): Promise<UrlType> => {
    const formData = new FormData()
    formData.append('avatar', file)

    return apiPost(`/user/upload_avatar/${id}`, formData, {signal})
}

export const apiDeleteUserAvatar = async (id: number, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/user/delete_avatar/${id}`,undefined, {signal})
}
