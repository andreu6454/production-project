import {StateSchema} from "@/app/providers/StoreProvider";

export const getMoviesPageIsLoading = (state: StateSchema) => state.moviesPage?.isLoading || false
export const getMoviesPageIsInited= (state: StateSchema) => state.moviesPage?.isInited || false
export const getMoviesPageError = (state: StateSchema) => state.moviesPage?.error

// filters
export const getMoviesPageLimit = (state: StateSchema) => state.moviesPage?.limit
export const getMoviesPagePageNum = (state: StateSchema) => state.moviesPage?.page || 1
export const getMoviesPageSearch = (state: StateSchema) => state.moviesPage?.search || null
export const getMoviesPageCountry = (state: StateSchema) => state.moviesPage?.country || null
export const getMoviesPageYear = (state: StateSchema) => state.moviesPage?.year || null
export const getMoviesPageGenre = (state: StateSchema) => state.moviesPage?.genre || null
export const getMoviesPageSort = (state: StateSchema) => state.moviesPage?.sort || ''
