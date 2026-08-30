import {MusicType} from "@/types/music.ts";
import {UrlType} from "@/types/url.ts";

import {apiPost} from "@/api";

export const apiUploadMusic = async (filesList: File[], signal?: AbortSignal): Promise<MusicType> => {
    const formData = new FormData()
    formData.append('music', filesList[0])
    formData.append('preview', filesList[1])
    formData.append('video', filesList[2])

    return apiPost(`/upload/music`, formData, signal)
}

export const apiUploadMusicPreview = async (id: number, file: File, signal?: AbortSignal): Promise<UrlType> => {
    const formData = new FormData()
    formData.append('preview', file)

    return apiPost(`/upload/preview/${id}`, formData, signal)
}

export const apiUploadMusicVideo = async (id: number, file: File, signal?: AbortSignal): Promise<UrlType> => {
    const formData = new FormData()
    formData.append('video', file)

    return apiPost(`/upload/video/${id}`, formData, signal)
}
