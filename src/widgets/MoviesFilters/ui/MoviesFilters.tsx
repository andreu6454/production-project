import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './MoviesFilters.module.scss'
import {memo, useCallback, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Card} from "@/shared/ui/redesigned/Card";
import {Icon} from "@/shared/ui/redesigned/Icon";
import SearchIcon from "@/shared/assets/icons/search.svg";
import {Input} from "@/shared/ui/redesigned/Input";
import {TabItem, Tabs} from "@/shared/ui/redesigned/Tabs";
import {Text} from "@/shared/ui/redesigned/Text";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {Button} from "@/shared/ui/redesigned/Button";

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

    const countryOptions = useMemo(() => [
        {
            value: 'Россия',
            content: t('Россия')
        },
        {
            value: 'СССР',
            content: t('СССР')
        },
        {
            value: 'США',
            content: t('США')
        },
        {
            value: 'Италия',
            content: t('Италия')
        },
        {
            value: 'Франция',
            content: t('Франция')
        },

    ], [t])

    const genreOptions = useMemo(() => [
        {
            value: 'Драма',
            content: t('Драма')
        },
        {
            value: 'Комедия',
            content: t('Комедия')
        },
        {
            value: 'Фантастика',
            content: t('Фантастика')
        },
        {
            value: 'Детектив',
            content: t('Детектив')
        },
        {
            value: 'Мультфильм',
            content: t('Мультфильм')
        },

    ], [t])

    const onCountryClick = useCallback((tab: TabItem) => {
        onChangeCountry(tab.value)
    }, [onChangeCountry])

    const onGenreClick = useCallback((tab: TabItem) => {
        onChangeGenre(tab.value)
    }, [onChangeGenre])


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

                <Text title={t('Страны')}/>
                <Tabs
                    direction={"row"}
                    align={'start'}
                    tabs={countryOptions}
                    value={country || ''}
                    onTabClick={onCountryClick}
                    className={classNames('', {}, [className])}
                />
                <Text title={t('Жанры')}/>
                <Tabs
                    direction={"row"}
                    align={'start'}
                    tabs={genreOptions}
                    value={genre || ''}
                    onTabClick={onGenreClick}
                    className={classNames('', {}, [className])}
                />
                <HStack max justify={'end'} align={"end"}>
                    <Button onClick={cancel}>
                        Сбросить
                    </Button>
                </HStack>
            </VStack>
        </Card>
    );
});
