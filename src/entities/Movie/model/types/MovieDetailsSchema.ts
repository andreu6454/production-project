import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";

export interface MovieDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: MovieDtoV13;
    isInited?: boolean;
}