import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './MoviesFilters.module.scss'
import {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {Card} from "@/shared/ui/redesigned/Card";
import {Icon} from "@/shared/ui/redesigned/Icon";
import SearchIcon from "@/shared/assets/icons/search.svg";
import {Input} from "@/shared/ui/redesigned/Input";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Button} from "@/shared/ui/redesigned/Button";
import {MoviesCountryTabs} from "@/features/moviesCountryTabs";
import {MoviesGenreTabs} from "@/features/moviesGenreTabs";
import {MovieSortSelector} from "@/features/movieSortSelector";

interface MoviesFiltersProps {
    className?: string;
    year: string | null;
    genre: string | null;
    country: string | null;
    search: string | '';
    sort: string | '';
    onChangeYear: (year: string) => void;
    onChangeGenre: (genre: string) => void;
    onChangeCountry: (country: string) => void;
    onChangeSearch: (search: string) => void;
    onChangeSort: (sort: string) => void;
}


export const MoviesFilters = memo((props: MoviesFiltersProps) => {
    const {
        className,
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
    } = props

    const {t} = useTranslation('movies')


    const cancel = useCallback(() => {
        onChangeGenre('')
        onChangeCountry('')
        onChangeYear('')
        onChangeSearch('')
        onChangeSort('')
    }, [])

    return (
        <Card
            padding={'24'}
            className={classNames(cls.MoviesFilters, {}, [className])}
        >
            <VStack gap={'8'}>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    size={'s'}
                    placeholder={t("Поиск")}
                    addonLeft={<Icon Svg={SearchIcon}/>}
                />
                <MoviesCountryTabs country={country || ''} onChangeCountry={onChangeCountry}/>
                <MoviesGenreTabs genre={genre || ''} onChangeGenre={onChangeGenre}/>
                <MovieSortSelector sort={sort} onChangeSort={onChangeSort}/>
                <HStack max justify={'end'} align={"end"}>
                    <Button onClick={cancel}>
                        {t('Сбросить')}
                    </Button>
                </HStack>
            </VStack>
        </Card>
    );
});
