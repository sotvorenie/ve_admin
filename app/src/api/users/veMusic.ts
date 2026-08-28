import {AppUsersResponse, AppUserType} from "@/types/user.ts";

import {apiGet} from "@api/index.ts";

export const getAllUsers = async (page: number = 1, limit: number = 30): Promise<AppUsersResponse> => {
    return apiGet(`/user/all?page=${page}&limit=${limit}`)
}

export const getUser = async (id: number): Promise<AppUserType> => {
    return apiGet(`/user/${id}`)
}