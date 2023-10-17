import {VStack} from "@/shared/ui/redesigned/Stack";
import {MovieListItemSkeleton} from "@/entities/Movie/ui/MovieListItem/MovieListItemSkeleton";

export const MovieListSkeleton = () => {
    return (
        <VStack max gap={'16'}>
            <MovieListItemSkeleton/>
            <MovieListItemSkeleton/>
            <MovieListItemSkeleton/>
            <MovieListItemSkeleton/>
            <MovieListItemSkeleton/>
            <MovieListItemSkeleton/>
            <MovieListItemSkeleton/>
            <MovieListItemSkeleton/>
        </VStack>
    );
};
