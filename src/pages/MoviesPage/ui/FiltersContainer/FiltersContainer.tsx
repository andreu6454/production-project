import {MoviesFilters} from "@/widgets/MoviesFilters/";
import {useMoviesFilters} from "@/pages/MoviesPage/lib/hooks/useMoviesFilters";

interface FiltersContainerProps {
    className?: string;
}

export const MoviesFiltersContainer = (props: FiltersContainerProps) => {

    const {
        year,
        genre,
        country,
        search,
        onChangeYear,
        onChangeGenre,
        onChangeCountry,
        onChangeSearch
    } = useMoviesFilters()

    return (
        <MoviesFilters
            year={year}
            genre={genre}
            country={country}
            search={search || ''}
            onChangeYear={onChangeYear}
            onChangeGenre={onChangeGenre}
            onChangeCountry={onChangeCountry}
            onChangeSearch={onChangeSearch}
        />
    );
};
