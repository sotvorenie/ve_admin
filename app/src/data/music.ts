import {ListHeadType} from "@/types/list.ts";

import {formatDuration} from "@composables/useFormstDuration.ts";

export const musicHeadItems: ListHeadType[] = [
    {
        label: 'id',
        key: 'id',
        type: 'text',
    },
    {
        label: 'Дата создания',
        key: 'createdAt',
        type: 'date',
    },
    {
        label: 'Дата обновления',
        key: 'updatedAt',
        type: 'date',
    },
    {
        label: 'Название',
        key: 'name',
        type: 'text',
    },
    {
        label: 'Обложка',
        key: 'previewUrl',
        type: 'preview',
    },
    {
        label: 'Длительность',
        key: 'duration',
        type: 'text',
        formatFunction: formatDuration
    },
    {
        label: 'Исполнитель',
        key: 'artistName',
        type: 'text',
        to: {
            page: '/ve_music/artists/',
            id: 'artistId'
        }
    },
]

export const musicColsStyle = '4rem 9rem 9rem 1fr 10rem 6rem 1fr'