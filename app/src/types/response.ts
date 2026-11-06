import {Meta} from "@/types/meta.ts";

export interface ListResponse<T> {
    data: T[]
}

export interface PaginatedResponse<T> extends ListResponse<T> {
    meta: Meta
}