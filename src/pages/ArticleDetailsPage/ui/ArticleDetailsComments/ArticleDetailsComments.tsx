import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useCallback, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Text, TextSize} from "@/shared/ui/deprecated/Text";
import {AddCommentForm} from "@/features/AddCommentForm";
import {CommentList} from "@/entities/Comment";
import {VStack} from "@/shared/ui/deprecated/Stack";
import {useSelector} from "react-redux";
import {getArticleComments} from "../../model/slices/articleDetailsCommentsSlice";
import {getArticleCommentsIsLoading} from "../../model/selectors/comments";
import {addCommentForArticle} from "../../model/services/addCommentForArticle/addCommentForArticle";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchCommentsByArticleId
} from "@/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const {className, id} = props
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    }, []);

    const comments = useSelector(getArticleComments.selectAll)

    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch])


    return (
        <VStack
            max
            gap={'8'}
            align={'start'}
            className={classNames('', {}, [className])}>

            <Text size={TextSize.L} title={t("Комментарии")}/>
            <AddCommentForm onSendComment={onSendComment}/>
            <CommentList isLoading={commentsIsLoading} comments={comments}/>

        </VStack>
    );
});
