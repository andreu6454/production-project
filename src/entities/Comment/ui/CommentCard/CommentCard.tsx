import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './CommentCard.module.scss'
import {memo} from "react";
import type {Comment} from '@/entities/Comment/'
import {Avatar} from "@/shared/ui/deprecated/Avatar";
import {Text} from "@/shared/ui/deprecated/Text";
import {Skeleton} from "@/shared/ui/deprecated/Skeleton";
import {AppLink} from "@/shared/ui/deprecated/AppLink";
import {HStack, VStack} from "@/shared/ui/deprecated/Stack";
import {getRouteProfile} from "@/shared/const/router";

interface CommentCardProps {
    className?: string;
    comment: Comment,
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {

    const {className, comment, isLoading} = props

    if (isLoading) {
        return (
            <VStack
                align={"start"}
                max
                gap={'8'}
                className={classNames(cls.CommentCard, {}, [className])}>
                <HStack gap={'4'} className={cls.header}>
                    <Skeleton width={40} height={40} border={"50%"}/>
                    <Skeleton width={100} height={16} className={cls.username}/>
                </HStack>
                <Skeleton width={"100%"} height={50} className={cls.text}/>
            </VStack>
        )
    }

    return (
        <VStack
            align={"start"}
            max
            gap={'4'}
            className={classNames(cls.CommentCard, {}, [className])}
        >
            <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
                {comment.user.avatar ? <Avatar size={40} src={comment.user.avatar}/> : null}
                <Text className={cls.username} title={comment.user.username}/>
            </AppLink>
            <Text className={cls.text} text={comment.text}/>
        </VStack>
    );
});
