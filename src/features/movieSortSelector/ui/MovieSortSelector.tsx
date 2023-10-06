import {memo, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {Text} from "@/shared/ui/redesigned/Text";
import {ListBox} from "@/shared/ui/redesigned/Popups";

interface MovieSortSelectorProps {
    className?: string;
    sort: string;
    onChangeSort: (sort: string) => void;
}

export const MovieSortSelector = memo((props: MovieSortSelectorProps) => {
    const { sort, onChangeSort} = props
    const {t} = useTranslation('movies')

    const sortOptions = useMemo(() => [
        {
            value: '',
            content: t('По порядку')
        },
        {
            value: 'votes.kp',
            content: t('По количеству оценок')
        },
        {
            value: 'rating.kp',
            content: t('По рейтингу')
        },
        {
            value: 'year',
            content: t('По дате выхода')
        },
        {
            value: 'name',
            content: t('По названию')
        },

    ], [t])

    return (
        <VStack gap={'8'} align={'start'}>
            <Text align={'left'} title={t("Сортировать")}/>
            <ListBox
                value={sort}
                onChange={onChangeSort}
                items={sortOptions}
                label={""}
            />
        </VStack>
    );
});
