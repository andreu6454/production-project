import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from "react";
import {Card} from "@/shared/ui/redesigned/Card";
import {MovieDetails} from "@/entities/Movie/ui/MovieDetails/MovieDetails";

interface MovieDetailsContainerProps {
    className?: string;
    id: number;
}

export const MovieDetailsContainer = memo((props: MovieDetailsContainerProps) => {
    const {className, id} = props

    return (
        <Card padding={'24'} border={'partial'} max className={classNames('', {}, [className])}>
            <MovieDetails id={id}/>
        </Card>
    );
});
