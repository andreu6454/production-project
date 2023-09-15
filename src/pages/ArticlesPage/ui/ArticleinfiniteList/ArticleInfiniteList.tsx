import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleinfiniteList.module.scss'
import {memo, useEffect} from "react";
import {ArticleList} from "@/entities/Article";
import {useSelector} from "react-redux";
import {getArticles} from "@/pages/ArticlesPage/model/slices/articlePageSlice";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView
} from "@/pages/ArticlesPage/model/selectors/articlePageSelectors";
import {initArticlesPage} from "@/pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSearchParams} from "react-router-dom";
import {Text, TextTheme} from "@/shared/ui/deprecated/Text";

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const {className} = props

    const dispatch = useAppDispatch()

    const [searchParams] = useSearchParams()
    const articles = useSelector(getArticles.selectAll)
    const view = useSelector(getArticlesPageView)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const error = useSelector(getArticlesPageError)


    useEffect(() => {
        dispatch(initArticlesPage(searchParams))
    }, [dispatch]);

    if (error) {
        return <Text theme={TextTheme.ERROR} title={"Произошла непредвиденная ошибка"}/>
    }
    return (
        <div className={classNames(cls.ArticleinfiniteList, {}, [className])}>
            <ArticleList
                className={className}
                isLoading={isLoading}
                view={view}
                articles={articles}
            />
        </div>
    );
});
