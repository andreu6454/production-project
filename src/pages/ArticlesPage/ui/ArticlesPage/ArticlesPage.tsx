import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticlesPage.module.scss'
import {memo, useCallback} from "react";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlePageReducer} from "../..//model/slices/articlePageSlice";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Page} from "@/widgets/Page/Page";
import {fetchNextArticlesPage} from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import {ArticlesPageFilters} from "@/pages/ArticlesPage/ui/ArticlesPageFilter/ArticlesPageFilters";
import {ArticleInfiniteList} from "@/pages/ArticlesPage/ui/ArticleinfiniteList/ArticleInfiniteList";
import {ArticlePageGreeting} from "@/features/articlePageGreeting";
import {ToggleFeatures} from "@/shared/lib/features";
import {StickyContentLayout} from "@/shared/layouts/StickyContentLayout";
import {ViewSelectorContainer} from "@/pages/ArticlesPage/ui/ViewSelectorContainer/ViewSelectorContainer";
import {FiltersContainer} from "@/pages/ArticlesPage/ui/FiltersContainer/FiltersContainer";

interface ArticlesPageProps {
    className?: string;
}


const reducers: ReducersList = {
    articlesPage: articlePageReducer
}
const ArticlesPage = ({className}: ArticlesPageProps) => {

    const dispatch = useAppDispatch()

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage())
    }, [dispatch])

    const content = <ToggleFeatures
        feature={'isAppRedesigned'}
        on={
            <StickyContentLayout
                content={
                    <Page
                        data-testid={"ArticlesPage"}
                        onScrollEnd={onLoadNextPart}
                        className={classNames(cls.ArticlesPageRedesigned, {}, [className])}
                    >

                        <ArticleInfiniteList className={cls.list}/>
                        <ArticlePageGreeting/>
                    </Page>
                }
                left={<ViewSelectorContainer/>}
                right={<FiltersContainer/>}
            />

        }
        off={
            <Page
                data-testid={"ArticlesPage"}
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlePageGreeting/>
                <ArticlesPageFilters/>
                <ArticleInfiniteList className={cls.list}/>
            </Page>
        }
    />

    return (
        <DynamicModuleLoader name={'articlesPage'} reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
