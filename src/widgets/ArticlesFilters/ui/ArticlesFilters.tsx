import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticlesFilters.module.scss'
import {memo} from "react";
import {useTranslation} from "react-i18next";
import {Card} from "@/shared/ui/redesigned/Card";
import {ArticleSortSelector} from "@/features/ArticleSortSelector";
import {Input} from "@/shared/ui/redesigned/Input";
import {ArticleTypeTabs} from "@/features/ArticleTypeTabs/ArticleTypeTabs";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {ArticleSortField, ArticleType} from "@/entities/Article";
import {SortOrder} from "@/shared/types";
import SearchIcon from '@/shared/assets/icons/search.svg'
import {Icon} from "@/shared/ui/redesigned/Icon";

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField,
    order: SortOrder,
    type: ArticleType,
    search: string,
    onChangeSearch: (newSearch: string) => void,
    onChangeOrder: (newOrder: SortOrder) => void,
    onChangeSort: (newSort: ArticleSortField) => void,
    onChangeType: (type: ArticleType) => void
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const {
        className,
        sort,
        order,
        type,
        search,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
    } = props
    const {t} = useTranslation()

    return (
        <Card
            padding={'24'}
            className={classNames(cls.ArticlesFilters, {}, [className])}
        >
            <VStack gap={'32'} align={'start'}>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t("Поиск")}
                    addonLeft={<Icon Svg={SearchIcon}/>}
                />
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleTypeTabs
                    className={cls.tabs}
                    onChangeType={onChangeType}
                    value={type}
                />
            </VStack>
        </Card>
    );
});
