import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPage.module.scss'
import {memo, useCallback, useEffect} from "react";
import {ArticleList} from "entities/Article";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlePageReducer, getArticles} from "../..//model/slices/articlePageSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView
} from "../../model/selectors/articlePageSelectors";
import {Page} from "widgets/Page/Page";
import {fetchNextArticlesPage} from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import {Text} from "shared/ui/Text/Text";
import {initArticlesPage} from "../../model/services/initArticlesPage/initArticlesPage";
import {ArticlesPageFilters} from "pages/ArticlesPage/ui/ArticlesPageFilter/ArticlesPageFilters";
import {useSearchParams} from 'react-router-dom'

interface ArticlesPageProps {
    className?: string;
}


const reducers: ReducersList = {
    articlesPage: articlePageReducer
}
const ArticlesPage = ({className}: ArticlesPageProps) => {

    const dispatch = useAppDispatch()

    const articles = useSelector(getArticles.selectAll)
    const view = useSelector(getArticlesPageView)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const error = useSelector(getArticlesPageError)

    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(initArticlesPage(searchParams))
    }, [dispatch]);


    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage())
    }, [dispatch])

    if (error) {
        return (<Text title={"ошибка"} text={"Произошла ошибка в запросе"}/>)
    }

    return (
        <DynamicModuleLoader name={'articlesPage'} reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >

                <ArticlesPageFilters/>
                <ArticleList
                    className={cls.list}
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />

            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
