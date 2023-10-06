import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './MoviesPage.module.scss';
import {memo, useEffect} from 'react';
import {Page} from "@/widgets/Page/Page";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {MoviesPageActions, MoviesPageReducer} from "@/pages/MoviesPage/model/slices/MoviesPageSlice";
import {useSelector} from "react-redux";
import {
    getMoviesPageData,
    getMoviesPageIsInited,
    getMoviesPageIsLoading
} from "@/pages/MoviesPage/model/selectors/moviesPageSelectors";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchMoviesList} from "@/pages/MoviesPage/model/services/fetchMoviesList";
import {MovieList} from "@/entities/Movie/ui/MovieList/MovieList";
import {StickyContentLayout} from "@/shared/layouts/StickyContentLayout";
import {MoviesFiltersContainer} from "@/pages/MoviesPage/ui/FiltersContainer/FiltersContainer";
import {MovieListSkeleton} from "@/entities/Movie/ui/MovieList/MovieListSkeleton";

interface MoviesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    moviesPage: MoviesPageReducer
}

const MoviesPage = memo((props: MoviesPageProps) => {
    const {className} = props;

    const dispatch = useAppDispatch()

    const moviesData = useSelector(getMoviesPageData)

    const isLoading = useSelector(getMoviesPageIsLoading)
    const isInited = useSelector(getMoviesPageIsInited)

    useEffect(() => {
        dispatch(MoviesPageActions.setIsLoading(true))
        dispatch(fetchMoviesList());
        dispatch(MoviesPageActions.setIsLoading(false))
    }, [dispatch]);

    const content =
        (isLoading || !isInited) ?
            <MovieListSkeleton/>
            :
            <MovieList movies={moviesData?.docs}/>

    // todo Добавить обработку ошибок
    return (
        <DynamicModuleLoader name={'moviesPage'} reducers={reducers} removeAfterUnmount>
            <StickyContentLayout
                content={
                    <Page className={classNames(cls.MoviesPage, {}, [className])}>
                        {content}
                    </Page>
                }
                right={<MoviesFiltersContainer/>}
            />
        </DynamicModuleLoader>
    );
});

export default MoviesPage;