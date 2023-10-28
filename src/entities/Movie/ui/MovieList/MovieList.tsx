import {classNames} from "@/shared/lib/classNames/classNames";
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {MovieListItem} from "@/entities/Movie/ui/MovieListItem/MovieListItem";
import {memo} from "react";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {MovieListSkeleton} from "@/entities/Movie/ui/MovieList/MovieListSkeleton";
import {useSelector} from "react-redux";
import {getMoviesPageIsInited} from "@/pages/MoviesPage/model/selectors/moviesPageSelectors";

interface MovieListProps {
    isLoading?: boolean;
    className?: string;
    movies?: MovieDtoV13[]
}

export const MovieList = memo((props: MovieListProps) => {
    const {isLoading, className, movies} = props

    const isInited = useSelector(getMoviesPageIsInited)

    const moviesForRender = movies?.map((el, index) => {
        return (
            <MovieListItem movie={el} key={el.id} index={++index}/>
        )
    })

    if (!isInited) {
        return (
            <VStack max gap={'16'} className={classNames('', {}, [className])}>
                <MovieListSkeleton/>
            </VStack>
        )
    }

    return (
        <VStack max gap={'16'} className={classNames('', {}, [className])}>
            {moviesForRender}
            {isLoading && <MovieListSkeleton/>}
        </VStack>
    );
});
