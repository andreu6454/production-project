import {MoviesFilters} from "@/widgets/MoviesFilters/";
import {useMoviesFilters} from "@/pages/MoviesPage/lib/hooks/useMoviesFilters";

export const MoviesFiltersContainer = () => {

    const {
        year,
        genre,
        country,
        search,
        sort,
        onChangeYear,
        onChangeGenre,
        onChangeCountry,
        onChangeSearch,
        onChangeSort
    } = useMoviesFilters()

    return (
        <MoviesFilters
            year={year}
            genre={genre}
            country={country}
            search={search || ''}
            sort={sort}
            onChangeSort={onChangeSort}
            onChangeYear={onChangeYear}
            onChangeGenre={onChangeGenre}
            onChangeCountry={onChangeCountry}
            onChangeSearch={onChangeSearch}
        />
    );
};
