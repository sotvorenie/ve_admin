import {AppUsersResponse, AppUserType} from "@/types/user.ts";
import {SuccessResponse} from "@/types/success.ts";
import {AvatarUrl} from "@/types/avatar.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const apiGetAllUsers = async (page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<AppUsersResponse> => {
    return apiGet(`/user/all?page=${page}&limit=${limit}`, undefined, signal)
}

export const apiGetUser = async (id: number, signal?: AbortSignal): Promise<AppUserType> => {
    return apiGet(`/user/${id}`,undefined, signal)
}

export const apiRedactUserName = async (id: number, name: string, signal?: AbortSignal): Promise<SuccessResponse> => {
    return apiPatch(`/user/redact_name/${id}`,{name}, signal)
}

export const apiRedactUserLogin = async (id: number, login: string, signal?: AbortSignal): Promise<SuccessResponse> => {
    return apiPatch(`/user/redact_login/${id}`,{login}, signal)
}

export const apiRedactUserPassword = async (id: number, password: string, signal?: AbortSignal): Promise<SuccessResponse> => {
    return apiPatch(`/user/redact_login/${id}`,{password}, signal)
}

export const apiDeleteUser = async (id: number, signal?: AbortSignal): Promise<SuccessResponse> => {
    return apiDelete(`/user/delete/${id}`,undefined, signal)
}

export const apiUploadUserAvatar = async (id: number, file: File, signal?: AbortSignal): Promise<AvatarUrl> => {
    const formData = new FormData()
    formData.append('avatar', file)

    return apiPost(`/user/upload_avatar/${id}`, formData, signal)
}

export const apiDeleteUserAvatar = async (id: number, signal?: AbortSignal): Promise<SuccessResponse> => {
    return apiPatch(`/user/delete_avatar/${id}`,undefined, signal)
}
