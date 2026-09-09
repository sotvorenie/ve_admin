import {MusicType} from "@/types/music.ts";
import {UrlType} from "@/types/url.ts";
import {CreateMusicForm} from "@pages/ve_music/music/create.vue";

import {apiPost} from "@/api";

export const apiUploadMusic = async (form: CreateMusicForm, signal?: AbortSignal): Promise<MusicType> => {
    const formData = new FormData()

    if (form.files.audio) formData.append('music', form.files.audio)
    if (form.files.preview) formData.append('preview', form.files.preview)
    if (form.files.video) formData.append('video', form.files.video)

    formData.append('title', form.info.title)
    formData.append('genre_id', String(form.info.genre))
    formData.append('artists', form.info.artistsIds.join(','))

    return apiPost(`/upload/music`, formData, { signal })
}

export const apiUploadMusicPreview = async (id: number, file: File, signal?: AbortSignal): Promise<UrlType> => {
    const formData = new FormData()
    formData.append('preview', file)

    return apiPost(`/upload/preview/${id}`, formData, {signal})
}

export const apiUploadMusicVideo = async (id: number, file: File, signal?: AbortSignal): Promise<UrlType> => {
    const formData = new FormData()
    formData.append('video', file)

    return apiPost(`/upload/video/${id}`, formData, {signal})
}
