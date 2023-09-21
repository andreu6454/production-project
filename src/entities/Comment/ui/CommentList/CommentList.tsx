import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from "react";
import {useTranslation} from "react-i18next";
import {Text as TextDeprecated} from "@/shared/ui/deprecated/Text";
import {CommentCard} from "@/entities/Comment/ui/CommentCard/CommentCard";
import type {Comment} from '@/entities/Comment/'
import {VStack} from "@/shared/ui/redesigned/Stack";
import {ToggleFeatures} from "@/shared/lib/features";
import {Text} from "@/shared/ui/redesigned/Text";

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
                : <ToggleFeatures
                    feature={'isAppRedesigned'}
                    on={
                        <Text text={t("Комментарии отсутствуют")}/>
                    }
                    off={
                        <TextDeprecated text={t("Комментарии отсутствуют")}/>
                    }
                />

            }
        </VStack>
    );
});
