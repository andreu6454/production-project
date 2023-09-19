import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticlesPageFilters.module.scss'
import {memo} from "react";
import {useTranslation} from "react-i18next";
import {ArticlesViewSelector} from "@/features/ArticlesViewSelector";
import {Card} from "@/shared/ui/deprecated/Card";
import {Input} from "@/shared/ui/deprecated/Input";
import {ArticleSortSelector} from "@/features/ArticleSortSelector";
import {ArticleTypeTabs} from "@/features/ArticleTypeTabs/ArticleTypeTabs";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {useArticleFilters} from "../../lib/hooks/useArticleFilters";

interface ArticlesPageFilterProps {
    className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFilterProps) => {
    const {className} = props
    const {t} = useTranslation('article')

    const {
        sort,
        search,
        onChangeSearch,
        onChangeType,
        type,
        onChangeSort,
        onChangeOrder,
        order,
        onChangeView,
        view
    } = useArticleFilters()


    return (
        <VStack
            gap={'0'}
            align={'start'}
            max
            className={classNames(cls.ArticlesPageFilter, {}, [className])}>
            <HStack max className={cls.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticlesViewSelector view={view} onViewClick={onChangeView}/>
            </HStack>
            <Card className={cls.search}>
                <Input onChange={onChangeSearch} value={search} placeholder={t("Поиск")}/>
            </Card>
            <ArticleTypeTabs
                className={cls.tabs}
                onChangeType={onChangeType}
                value={type}
            />
        </VStack>
    );
});
