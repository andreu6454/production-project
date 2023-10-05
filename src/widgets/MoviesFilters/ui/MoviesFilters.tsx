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

interface MoviesFiltersProps {
    className?: string;
    year: string | null;
    genre: string | null;
    country: string | null;
    search: string | '';
    onChangeYear: (year: string) => void;
    onChangeGenre: (genre: string) => void;
    onChangeCountry: (country: string) => void;
    onChangeSearch: (search: string) => void;
}


export const MoviesFilters = memo((props: MoviesFiltersProps) => {
    const {
        className,
        year,
        genre,
        country,
        search,
        onChangeYear,
        onChangeGenre,
        onChangeCountry,
        onChangeSearch
    } = props

    const {t} = useTranslation('movies')


    const cancel = useCallback(() => {
        onChangeGenre('')
        onChangeCountry('')
        onChangeYear('')
        onChangeSearch('')
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
                <HStack max justify={'end'} align={"end"}>
                    <Button onClick={cancel}>
                        {t('Сбросить')}
                    </Button>
                </HStack>
            </VStack>
        </Card>
    );
});
