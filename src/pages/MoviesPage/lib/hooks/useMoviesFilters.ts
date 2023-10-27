import {useSelector} from "react-redux";
import {
    getMoviesPageCountry,
    getMoviesPageGenre,
    getMoviesPageSearch, getMoviesPageSort,
    getMoviesPageYear
} from "../../model/selectors/moviesPageSelectors";
import {useCallback} from "react";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {MoviesPageActions} from "../../model/slices/MoviesPageSlice";
import {useDebounce} from "@/shared/lib/hooks/useDebounce/useDebounce";
import {fetchMoviesList} from "../../model/services/fetchMoviesList";

export const useMoviesFilters = () => {
    const year = useSelector(getMoviesPageYear)
    const country = useSelector(getMoviesPageCountry)
    const genre = useSelector(getMoviesPageGenre)
    const search = useSelector(getMoviesPageSearch)
    const sort = useSelector(getMoviesPageSort)

    const dispatch = useAppDispatch()

    const fetchData = useCallback(() => {
        dispatch(fetchMoviesList({replace: true}))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeYear = useCallback((year: string) => {
        dispatch(MoviesPageActions.setPage(1))
        dispatch(MoviesPageActions.setYear(year))
        fetchData()
    }, [dispatch, fetchData])
    const onChangeCountry = useCallback((country: string) => {
        dispatch(MoviesPageActions.setPage(1))
        dispatch(MoviesPageActions.setCountry(country))
        fetchData()
    }, [dispatch, fetchData])
    const onChangeGenre = useCallback((genre: string) => {
        dispatch(MoviesPageActions.setPage(1))
        dispatch(MoviesPageActions.setGenre(genre))
        fetchData()
    }, [dispatch, fetchData])
    const onChangeSort = useCallback((sort: string) => {
        dispatch(MoviesPageActions.setPage(1))
        dispatch(MoviesPageActions.setSort(sort))
        fetchData()
    }, [dispatch, fetchData])
    const onChangeSearch = useCallback((search: string) => {
        dispatch(MoviesPageActions.setPage(1))
        dispatch(MoviesPageActions.setSearch(search))
        debouncedFetchData()
    }, [dispatch, debouncedFetchData])

    return {
        year,
        country,
        genre,
        search,
        sort,
        onChangeYear,
        onChangeCountry,
        onChangeGenre,
        onChangeSort,
        onChangeSearch
    }
}