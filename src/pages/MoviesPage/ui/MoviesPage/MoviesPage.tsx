import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './MoviesPage.module.scss';
import {memo, useCallback, useEffect} from 'react';
import {Page} from "@/widgets/Page/Page";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {getMovies, MoviesPageActions, MoviesPageReducer} from "@/pages/MoviesPage/model/slices/MoviesPageSlice";
import {useSelector} from "react-redux";
import {getMoviesPageIsLoading} from "@/pages/MoviesPage/model/selectors/moviesPageSelectors";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchMoviesList} from "@/pages/MoviesPage/model/services/fetchMoviesList";
import {MovieList} from "@/entities/Movie/ui/MovieList/MovieList";
import {StickyContentLayout} from "@/shared/layouts/StickyContentLayout";
import {MoviesFiltersContainer} from "@/pages/MoviesPage/ui/FiltersContainer/FiltersContainer";
import {fetchNextMoviesPage} from "@/pages/MoviesPage/model/services/fetchNextMoviesPage";

interface MoviesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    moviesPage: MoviesPageReducer
}

const MoviesPage = memo((props: MoviesPageProps) => {
    const {className} = props;

    const dispatch = useAppDispatch()

    const moviesData = useSelector(getMovies.selectAll)
    const isLoading = useSelector(getMoviesPageIsLoading)

    useEffect(() => {
        dispatch(MoviesPageActions.setIsLoading(true))
        dispatch(fetchMoviesList({replace: false}));
        dispatch(MoviesPageActions.setIsLoading(false))
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextMoviesPage())
    }, [dispatch])

    // todo Добавить обработку ошибок
    return (
        <DynamicModuleLoader name={'moviesPage'} reducers={reducers} removeAfterUnmount>
            <StickyContentLayout
                content={
                    <Page
                        onScrollEnd={onLoadNextPart}
                        className={classNames(cls.MoviesPage, {}, [className])}
                    >
                        <MovieList
                            isLoading={isLoading}
                            movies={moviesData}
                        />
                    </Page>
                }
                right={<MoviesFiltersContainer/>}
            />
        </DynamicModuleLoader>
    );
});

export default MoviesPage;