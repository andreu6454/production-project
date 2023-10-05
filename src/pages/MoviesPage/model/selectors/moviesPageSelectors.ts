import {StateSchema} from "@/app/providers/StoreProvider";

export const getMoviesPageIsLoading = (state: StateSchema) => state.moviesPage?.isLoading || false
export const getMoviesPageError = (state: StateSchema) => state.moviesPage?.error
export const getMoviesPageData = (state: StateSchema) => state.moviesPage?.data


// filters
export const getMoviesPageLimit = (state: StateSchema) => state.moviesPage?.limit
export const getMoviesPagePage = (state: StateSchema) => state.moviesPage?.page
export const getMoviesPageSearch = (state: StateSchema) => state.moviesPage?.search || null
export const getMoviesPageCountry = (state: StateSchema) => state.moviesPage?.country || null
export const getMoviesPageYear = (state: StateSchema) => state.moviesPage?.year || null
export const getMoviesPageGenre = (state: StateSchema) => state.moviesPage?.genre || null
