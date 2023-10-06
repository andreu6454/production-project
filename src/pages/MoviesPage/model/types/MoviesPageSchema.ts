import {MovieDocsResponseDtoV13} from "@openmoviedb/kinopoiskdev_client";

export interface MoviesPageSchema {
    isLoading?: boolean;
    error?: string;
    data?: MovieDocsResponseDtoV13;
    isInited?: boolean;

    page: number;
    limit?: number;

    //filters
    country?: string;
    genre?: string;
    year?: string;
    search?: string;
    sort?: string;
}