import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from "react";
import {useTranslation} from "react-i18next";
import {Text} from "@/shared/ui/Text";
import {CommentCard} from "@/entities/Comment/ui/CommentCard/CommentCard";
import type {Comment} from '@/entities/Comment/'
import {VStack} from "@/shared/ui/Stack";

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {

    const {className, comments, isLoading} = props
    const {t} = useTranslation()

    return (
        <VStack max align={'start'} gap={'16'} className={classNames('', {}, [className])}>
            {comments?.length
                ? comments.map(comment => (
                    <CommentCard
                        key={comment?.id}
                        isLoading={isLoading}
                        comment={comment}
                    />
                ))
                : <Text text={t("Комментарии отсутствуют")}/>
            }
        </VStack>
    );
});
