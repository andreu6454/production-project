import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Select, SelectOption} from "@/shared/ui/deprecated/Select";
import {ArticleSortField} from "@/entities/Article/model/types/article";
import {SortOrder} from "@/shared/types";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {ToggleFeatures} from "@/shared/lib/features";
import {ListBox} from "@/shared/ui/redesigned/Popups";
import {Text} from "@/shared/ui/redesigned/Text";
import cls from './ArticleSortSelector.module.scss'

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField,
    order: SortOrder,
    onChangeOrder: (newOrder: SortOrder) => void,
    onChangeSort: (newSort: ArticleSortField) => void,
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {className, onChangeSort, onChangeOrder, order, sort} = props
    const {t} = useTranslation('article')

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию')
        },
        {
            value: 'desc',
            content: t('убыванию')
        },

    ], [t])

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('дате создания')
        },
        {
            value: ArticleSortField.TITLE,
            content: t('названию')
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('просмотрам')
        },

    ], [t])


    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <div className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}>
                    <VStack gap={'8'} align={'start'}>
                        <Text align={'left'} text={t("Сортировать по:")}/>
                        <ListBox
                            value={sort}
                            onChange={onChangeSort}
                            items={sortFieldOptions}
                            label={""}
                        />
                        <ListBox
                            value={order}
                            onChange={onChangeOrder}
                            items={orderOptions}
                            label={t("")}
                        />
                    </VStack>
                </div>
            }
            off={
                <HStack gap={'8'} className={classNames('', {}, [className])}>
                    <Select
                        value={sort}
                        onChange={onChangeSort}
                        options={sortFieldOptions}
                        label={t("Сортировать по")}
                    />
                    <Select
                        value={order}
                        onChange={onChangeOrder}
                        options={orderOptions}
                        label={t("по")}
                    />
                </HStack>
            }
        />
    );
});
