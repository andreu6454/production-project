import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPage.module.scss'
import {memo, useCallback, useEffect} from "react";
import {ArticleList, ArticleView} from "entities/Article";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlePageActions, articlePageReducer, getArticles} from "../..//model/slices/articlePageSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticlesList} from "../../model/services/fetchArticlesList/fetchArticlesList";
import {useSelector} from "react-redux";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView
} from "../../model/selectors/articlePageSelectors";
import {ArticlesViewSelector} from "features/ArticlesViewSelector";

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

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchArticlesList())
        dispatch(articlePageActions.initState())
    }, [dispatch]);

    return (
        <DynamicModuleLoader name={'articlesPage'} reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticlesViewSelector view={view} onViewClick={onChangeView}/>
                <ArticleList isLoading={isLoading} view={view} articles={articles}/>
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
