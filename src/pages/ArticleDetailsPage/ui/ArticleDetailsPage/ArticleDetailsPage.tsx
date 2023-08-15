import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback, useEffect} from "react";
import {ArticleDetails, ArticleList} from "entities/Article";
import {useParams} from "react-router-dom";
import {Text, TextSize, TextTheme} from "shared/ui/Text/Text";
import {CommentList} from "entities/Comment";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {getArticleComments} from "../../model/slices/articleDetailsCommentsSlice";
import {useSelector} from "react-redux";
import {getArticleCommentsIsLoading} from "../../model/selectors/comments";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchCommentsByArticleId} from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {AddCommentForm} from "features/AddCommentForm";
import {addCommentForArticle} from "../../model/services/addCommentForArticle/addCommentForArticle";
import {Page} from "widgets/Page/Page";
import {getArticleRecommendations} from "../../model/slices/articleDetailsPageRecommendationsSlice";
import {getArticleRecommendationsIsLoading} from "../../model/selectors/recommendations";
import {
    fetchArticleRecommendations
} from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import {articleDetailsPageReducer} from "../../model/slices";
import {ArticleDetailsPageHeader} from "pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import {VStack} from "shared/ui/Stack";

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
    const {t} = useTranslation('article-details')
    const comments = useSelector(getArticleComments.selectAll)
    const recommendations = useSelector(getArticleRecommendations.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading)

    const dispatch = useAppDispatch()

    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
        dispatch(fetchArticleRecommendations())
    }, [dispatch]);

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
                <Text theme={TextTheme.ERROR} title={"Ошибка"} text={t("Статья не найдена")}/>
            </div>
        )
    }

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch])



    return (
        <DynamicModuleLoader name={"articleDetailsPage"} removeAfterUnmount reducers={reducers}>
            <Page className={classNames(cls.ArticleDetailesPage, {}, [className])}>
                <VStack align={'start'} gap={'16'} max>
                    <ArticleDetailsPageHeader/>
                    <ArticleDetails id={id}/>

                    <Text size={TextSize.L} className={cls.commentTitle} title={t("Рекомендуем")}/>
                    <ArticleList
                        target={"_blank"}
                        articles={recommendations}
                        isLoading={recommendationsIsLoading}
                        className={cls.recommendations}
                    />

                    <Text size={TextSize.L} className={cls.commentTitle} title={t("Комментарии")}/>
                    <AddCommentForm onSendComment={onSendComment}/>
                    <CommentList isLoading={commentsIsLoading} comments={comments}/>

                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);