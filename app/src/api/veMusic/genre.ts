import {CreatedGenreType, GenresListType, GenreType} from "@/types/genre.ts";
import {MusicListType} from "@/types/music.ts";

import {apiDelete, apiGet, apiPatch, apiPost} from "@/api";

export const apiGetAllGenres = async (signal?: AbortSignal): Promise<GenresListType> => {
    return apiGet(`/genre/all?is_admin=true`, {signal})
}

export const apiGetGenre = async (id: number, signal?: AbortSignal): Promise<GenreType> => {
    return apiGet(`/genre/admin/${id}`, {signal})
}

export const apiGetAllGenreMusic = async (id: number, page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<MusicListType> => {
    return apiGet(`/genre/admin/music/${id}?page=${page}&limit=${limit}`, {signal})
}

export const apiCreateGenre = async (name: string, signal?: AbortSignal): Promise<CreatedGenreType> => {
    return apiPost(`/genre/admin/create`, {name}, {signal})
}

export const apiDeleteGenre = async (id: number, signal?: AbortSignal): Promise<void> => {
    return apiDelete(`/genre/admin/delete/${id}`, {signal})
}

export const apiRedactGenreName = async (id: number, name: string, signal?: AbortSignal): Promise<void> => {
    return apiPatch(`/genre/admin/redact_name/${id}`, {name}, {signal})
}
