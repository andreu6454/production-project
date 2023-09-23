import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useCallback, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Text as TextDeprecated, TextSize} from "@/shared/ui/deprecated/Text";
import {AddCommentForm} from "@/features/addCommentForm";
import {CommentList} from "@/entities/Comment";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {useSelector} from "react-redux";
import {getArticleComments} from "../../model/slices/articleDetailsCommentsSlice";
import {getArticleCommentsIsLoading} from "../../model/selectors/comments";
import {addCommentForArticle} from "../../model/services/addCommentForArticle/addCommentForArticle";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchCommentsByArticleId
} from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {ToggleFeatures} from "@/shared/lib/features";
import {Text} from "@/shared/ui/redesigned/Text";
import {getArticleDetailsError} from "@/entities/Article/model/selectors/articleDetails";

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const {className, id} = props
    const {t} = useTranslation('article-details')
    const dispatch = useAppDispatch()
    const error = useSelector(getArticleDetailsError)

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    }, []);

    const comments = useSelector(getArticleComments.selectAll)

    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch])


    return (
        <>
            {!error &&
                <VStack
                    max
                    gap={'8'}
                    align={'start'}
                    className={classNames('', {}, [className])}>

                    <ToggleFeatures
                        feature={'isAppRedesigned'}
                        on={<Text size={'l'} title={t("Комментарии")}/>}
                        off={<TextDeprecated size={TextSize.L} title={t("Комментарии")}/>}
                    />
                    <AddCommentForm onSendComment={onSendComment}/>
                    <CommentList isLoading={commentsIsLoading} comments={comments}/>

                </VStack>
            }
        </>

    );
});
