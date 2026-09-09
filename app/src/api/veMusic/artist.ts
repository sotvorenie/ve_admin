import {ArtistsListType, ArtistType, CreatedArtistType} from "@/types/artist.ts";
import {MusicListType} from "@/types/music.ts";
import {UrlType} from "@/types/url.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const apiGetArtists = async (name: string = '', page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<ArtistsListType> => {
    return apiGet(`/artist/list?name=${name}&page=${page}&limit=${limit}&is_admin=true`, {signal})
}

export const apiGetArtist = async (id: number, signal?: AbortSignal): Promise<ArtistType> => {
    return apiGet(`/artist/${id}`, {signal})
}

export const apiGetAllArtistMusic = async (id: number, page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<MusicListType> => {
    return apiGet(`/artist/music/${id}?page=${page}&limit=${limit}`, {signal})
}

export const apiCreateArtist = async (name: string, signal?: AbortSignal): Promise<CreatedArtistType> => {
    return apiPost(`/artist/create`, {name}, {signal})
}

export const apiDeleteArtist = async (id: number, signal?: AbortSignal): Promise<void> => {
    return apiDelete(`/artist/delete/${id}`, {signal})
}

export const apiRedactArtistName = async (id: number, name: string, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/artist/redact_name/${id}`, {name}, {signal})
}

export const apiUploadArtistAvatar = async (id: number, file: File, signal?: AbortSignal): Promise<UrlType> => {
    const formData = new FormData()
    formData.append('avatar', file)

    return apiPost(`/artist/upload_avatar/${id}`, formData, {signal})
}

export const apiRedactAvatarUrlForArtist = async (id: number, avatarUrl: string, signal?: AbortSignal): Promise<void> => {
    return apiPost(`/artist/redact_avatar_url/${id}`, {url: avatarUrl}, {signal})
}

export const apiDeleteArtistAvatar = async (id: number, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/artist/delete_avatar/${id}`,undefined, {signal})
}
