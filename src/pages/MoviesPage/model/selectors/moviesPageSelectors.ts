import {StateSchema} from "@/app/providers/StoreProvider";

export const getMoviesPageIsLoading = (state: StateSchema) => state.moviesPage?.isLoading || false
export const getMoviesPageError = (state: StateSchema) => state.moviesPage?.error
export const getMoviesPageData = (state: StateSchema) => state.moviesPage?.data
