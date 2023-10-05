import {classNames} from "@/shared/lib/classNames/classNames";
import {MovieDtoV13} from "@openmoviedb/kinopoiskdev_client";
import {MovieListItem} from "@/entities/Movie/ui/MovieListItem/MovieListItem";
import {memo} from "react";
import {VStack} from "@/shared/ui/redesigned/Stack";

interface MovieListProps {
    className?: string;
    movies?: MovieDtoV13[]
}

export const MovieList = memo((props: MovieListProps) => {
    const {className, movies} = props


    const moviesForRender = movies?.map((el, index) => {
        return (
            <MovieListItem movie={el} key={el.id} index={++index}/>
        )
    })


    return (
        <VStack max gap={'16'} className={classNames('', {}, [className])}>
            {moviesForRender}
        </VStack>
    );
});
