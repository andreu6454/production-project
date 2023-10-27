import {MovieDocsResponseDtoV13, MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {EntityState} from "@reduxjs/toolkit";

export interface MoviesPageSchema extends EntityState<MovieDtoV13> {
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