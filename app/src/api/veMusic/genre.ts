import {CreatedGenreType, GenresListType} from "@/types/genre.ts";
import {MusicListType} from "@/types/music.ts";
import {SuccessResponseType} from "@/types/success.ts";

import {apiDelete, apiGet, apiPost} from "@/api";

export const apiGetAllGenres = async (page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<GenresListType> => {
    return apiGet(`/genre/all?page=${page}&limit=${limit}`, undefined, signal)
}

export const apiGetAllGenreMusic = async (id: number, page: number = 1, limit: number = 30, signal?: AbortSignal): Promise<MusicListType> => {
    return apiGet(`/genre/music/${id}?page=${page}&limit=${limit}`, undefined, signal)
}

export const apiCreateGenre = async (name: string, signal?: AbortSignal): Promise<CreatedGenreType> => {
    return apiPost(`/genre/create`, {name}, signal)
}

export const apiDeleteGenre = async (id: number, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiDelete(`/genre/delete/${id}`, undefined, signal)
}

export const apiRedactGenreName = async (id: number, name: string, signal?: AbortSignal): Promise<SuccessResponseType> => {
    return apiPost(`/genre/redact_name/${id}`, {name}, signal)
}
