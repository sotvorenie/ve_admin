import {CreatedGenreType, GenresListType} from "@/types/genre.ts";
import {MusicListType} from "@/types/music.ts";

import {apiDelete, apiGet, apiPost} from "@/api";

export const apiGetAllGenres = async (signal?: AbortSignal): Promise<GenresListType> => {
    return apiGet(`/genre/all?is_admin=true`, {signal})
}

export const apiGetAllGenreMusic = async (id: number, page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<MusicListType> => {
    return apiGet(`/genre/music/${id}?page=${page}&limit=${limit}`, {signal})
}

export const apiCreateGenre = async (name: string, signal?: AbortSignal): Promise<CreatedGenreType> => {
    return apiPost(`/genre/create`, {name}, {signal})
}

export const apiDeleteGenre = async (id: number, signal?: AbortSignal): Promise<void> => {
    return apiDelete(`/genre/delete/${id}`, {signal})
}

export const apiRedactGenreName = async (id: number, name: string, signal?: AbortSignal): Promise<void> => {
    return apiPost(`/genre/redact_name/${id}`, {name}, {signal})
}
