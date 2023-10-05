import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './MoviesPage.module.scss';
import {memo, useEffect} from 'react';
import {Page} from "@/widgets/Page/Page";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {MoviesPageReducer} from "@/pages/MoviesPage/model/slices/MoviesPageSlice";
import {useSelector} from "react-redux";
import {getMoviesPageData} from "@/pages/MoviesPage/model/selectors/moviesPageSelectors";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchMoviesList} from "@/pages/MoviesPage/model/services/fetchMoviesList";
import {MovieList} from "@/entities/Movie/ui/MovieList/MovieList";

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

    useEffect(() => {
        dispatch(fetchMoviesList());
    }, []);

    return (
        <DynamicModuleLoader name={'moviesPage'} reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.MoviesPage, {}, [className])}>
                <MovieList movies={moviesData?.docs}/>
            </Page>
        </DynamicModuleLoader>
    );
});

export default MoviesPage;