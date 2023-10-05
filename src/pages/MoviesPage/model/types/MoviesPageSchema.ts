import {MovieDocsResponseDtoV13} from "@openmoviedb/kinopoiskdev_client";

export interface MoviesPageSchema {
    isLoading?: boolean;
    error?: string;
    data?: MovieDocsResponseDtoV13;
}