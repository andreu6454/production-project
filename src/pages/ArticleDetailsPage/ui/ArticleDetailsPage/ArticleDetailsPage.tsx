import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback, useEffect} from "react";
import {ArticleDetails} from "entities/Article";
import {useNavigate, useParams} from "react-router-dom";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {CommentList} from "entities/Comment";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
    articleDetailsCommentsReducer,
    getArticleComments
} from "../../model/slices/articleDetailsCommentsSlice";
import {useSelector} from "react-redux";
import {getArticleCommentsIsLoading} from "../../model/selectors/comments";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchCommentsByArticleId
} from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {AddCommentForm} from "features/AddCommentForm";
import {addCommentForArticle} from "../../model/services/addCommentForArticle/addCommentForArticle";
import {Button} from "shared/ui/Button/Button";
import {RoutePath} from "shared/config/routeConfig/routeConfig";

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    ArticleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
    const {t} = useTranslation('article-details')
    const comment = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
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

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    return (
        <DynamicModuleLoader name={"ArticleDetailsComments"} removeAfterUnmount reducers={reducers}>
            <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
                <Button onClick={onBackToList}>{t("Назад к списку")}</Button>
                <ArticleDetails id={id}/>
                <Text className={cls.commentTitle} title={t("Комментарии")}/>
                <AddCommentForm onSendComment={onSendComment}/>
                <CommentList isLoading={commentsIsLoading} comments={comment}/>
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);