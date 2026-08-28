import {ArtistsListType, CreatedArtistType} from "@/types/artist.ts";
import {MusicListType} from "@/types/music.ts";
import {SuccessResponseType} from "@/types/success.ts";
import {AvatarUrlType} from "@/types/avatar.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const apiGetAllArtists = async (page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<ArtistsListType> => {
    return apiGet(`/artist/all?page=${page}&limit=${limit}`, undefined, signal)
}

export const apiGetAllArtistMusic = async (id: number, page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<MusicListType> => {
    return apiGet(`/artist/music/${id}?page=${page}&limit=${limit}`, undefined, signal)
}

export const apiCreateArtist = async (name: string, signal?: AbortSignal): Promise<CreatedArtistType> => {
    return apiPost(`/artist/create`, {name}, signal)
}

export const apiDeleteArtist = async (id: number, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiDelete(`/artist/delete/${id}`, undefined, signal)
}

export const apiRedactArtistName = async (id: number, name: string, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiPost(`/artist/redact_name/${id}`, {name}, signal)
}

export const apiUploadArtistAvatar = async (id: number, file: File, signal?: AbortSignal): Promise<AvatarUrlType> => {
    const formData = new FormData()
    formData.append('avatar', file)

    return apiPost(`/artist/upload_avatar/${id}`, formData, signal)
}

export const apiDeleteArtistAvatar = async (id: number, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiPatch(`/artist/delete_avatar/${id}`,undefined, signal)
}
