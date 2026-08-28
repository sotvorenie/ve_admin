import {ArtistsList, CreatedArtist} from "@/types/artist.ts";
import {MusicList} from "@/types/music.ts";
import {SuccessResponse} from "@/types/success.ts";
import {AvatarUrl} from "@/types/avatar.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const apiGetAllArtists = async (page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<ArtistsList> => {
    return apiGet(`/artist/all?page=${page}&limit=${limit}`, undefined, signal)
}

export const apiGetAllArtistMusic = async (id: number, page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<MusicList> => {
    return apiGet(`/artist/music/${id}?page=${page}&limit=${limit}`, undefined, signal)
}

export const apiCreateArtist = async (name: string, signal?: AbortSignal): Promise<CreatedArtist> => {
    return apiPost(`/artist/create`, {name}, signal)
}

export const apiDeleteArtist = async (id: number, signal?: AbortSignal): Promise<SuccessResponse> => {
    return apiDelete(`/artist/delete/${id}`, undefined, signal)
}

export const apiRedactArtistName = async (id: number, name: string, signal?: AbortSignal): Promise<SuccessResponse> => {
    return apiPost(`/artist/redact_name/${id}`, {name}, signal)
}

export const apiUploadArtistAvatar = async (id: number, file: File, signal?: AbortSignal): Promise<AvatarUrl> => {
    const formData = new FormData()
    formData.append('avatar', file)

    return apiPost(`/artist/upload_avatar/${id}`, formData, signal)
}

export const apiDeleteArtistAvatar = async (id: number, signal?: AbortSignal): Promise<SuccessResponse> => {
    return apiPatch(`/artist/delete_avatar/${id}`,undefined, signal)
}
