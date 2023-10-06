import {memo, useCallback, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Text} from "@/shared/ui/redesigned/Text";
import {TabItem, Tabs} from "@/shared/ui/redesigned/Tabs";
import {classNames} from "@/shared/lib/classNames/classNames";
import {VStack} from "@/shared/ui/redesigned/Stack";

interface MoviesGenreTabsProps {
    className?: string;
    genre?: string;
    onChangeGenre?: (genre: string) => void;
}

export const MoviesGenreTabs = memo((props: MoviesGenreTabsProps) => {
    const {className, onChangeGenre, genre} = props
    const {t} = useTranslation('movies')

    const genreOptions = useMemo(() => [
        {
            value: 'драма',
            content: t('Драма')
        },
        {
            value: 'комедия',
            content: t('Комедия')
        },
        {
            value: 'фантастика',
            content: t('Фантастика')
        },
        {
            value: 'детектив',
            content: t('Детектив')
        },
        {
            value: 'мультфильм',
            content: t('Мультфильм')
        },

    ], [t])


    const onGenreClick = useCallback((tab: TabItem) => {
        onChangeGenre?.(tab.value)
    }, [onChangeGenre])

    return (
        <VStack gap={'8'}>
            <Text title={t('Жанры')}/>
            <Tabs
                direction={"row"}
                align={'start'}
                tabs={genreOptions}
                value={genre || ''}
                onTabClick={onGenreClick}
                className={classNames('', {}, [className])}
            />
        </VStack>
    );
});
