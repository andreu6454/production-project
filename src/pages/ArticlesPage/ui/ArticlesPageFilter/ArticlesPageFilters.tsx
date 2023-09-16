import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticlesPageFilters.module.scss'
import {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {ArticlesViewSelector} from "@/features/ArticlesViewSelector";
import {ArticleView} from "@/entities/Article";
import {articlePageActions} from "../../model/slices/articlePageSlice";
import {useSelector} from "react-redux";
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView
} from "../../model/selectors/articlePageSelectors";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Card} from "@/shared/ui/deprecated/Card";
import {Input} from "@/shared/ui/deprecated/Input";
import {ArticleSortSelector} from "@/features/ArticleSortSelector";
import {ArticleSortField, ArticleType} from "@/entities/Article/model/types/article";
import {SortOrder} from "@/shared/types";
import {fetchArticlesList} from "../../model/services/fetchArticlesList/fetchArticlesList";
import {useDebounce} from "@/shared/lib/hooks/useDebounce/useDebounce";
import {ArticleTypeTabs} from "@/features/ArticleTypeTabs/ArticleTypeTabs";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";

interface ArticlesPageFilterProps {
    className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFilterProps) => {
    const {className} = props
    const {t} = useTranslation('article')
    const view = useSelector(getArticlesPageView)
    const sort = useSelector(getArticlesPageSort)
    const order = useSelector(getArticlesPageOrder)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)


    const dispatch = useAppDispatch()

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({replace: true}))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view))
        dispatch(articlePageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        dispatch(articlePageActions.setSort(sort))
        dispatch(articlePageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(articlePageActions.setOrder(order))
        dispatch(articlePageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlePageActions.setSearch(search))
        dispatch(articlePageActions.setPage(1))
        debouncedFetchData()
    }, [dispatch, debouncedFetchData])

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlePageActions.setType(value))
        dispatch(articlePageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])


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
