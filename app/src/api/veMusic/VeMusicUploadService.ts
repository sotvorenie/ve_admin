import {Track, TrackForm} from "@/types/music.ts";
import {Url} from "@/types/url.ts";

import {apiPost} from "@/api";

export const VeMusicUploadService = {
    uploadMusic(
        form: TrackForm,
        signal?: AbortSignal,
    ): Promise<Track> {
        const formData = new FormData()

        if (form.files.audio) formData.append('music', form.files.audio)
        if (form.files.preview) formData.append('preview', form.files.preview)
        if (form.files.video) formData.append('video', form.files.video)

        formData.append('url', form.files.previewPath)

        formData.append('title', form.info.title)
        formData.append('genre_id', String(form.info.genre))
        formData.append('artists', form.info.artistsIds.join(','))

        return apiPost(`/upload/admin/music`, formData, { signal })
    },

    uploadAudio(
        id: number,
        file: File,
        signal?: AbortSignal,
    ): Promise<Url> {
        const formData = new FormData()
        formData.append('music', file)

        return apiPost(`/upload/admin/${id}/audio`, formData, {signal})
    },

    uploadPreview(
        id: number,
        file: File,
        signal?: AbortSignal,
    ): Promise<Url> {
        const formData = new FormData()
        formData.append('preview', file)

        return apiPost(`/upload/admin/${id}/preview`, formData, {signal})
    },

    uploadVideo(
        id: number,
        file: File,
        signal?: AbortSignal,
    ): Promise<Url> {
        const formData = new FormData()
        formData.append('video', file)

        return apiPost(`/upload/admin/${id}/video`, formData, {signal})
    },
}