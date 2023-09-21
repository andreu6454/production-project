import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './CommentCard.module.scss'
import {memo} from "react";
import type {Comment} from '@/entities/Comment/'
import {Avatar as AvatarDeprecated} from "@/shared/ui/deprecated/Avatar";
import {Text as TextDeprecated} from "@/shared/ui/deprecated/Text";
import {Skeleton as SkeletonDeprecated} from "@/shared/ui/deprecated/Skeleton";
import {Skeleton as SkeletonRedesigned} from "@/shared/ui/redesigned/Skeleton";
import {AppLink as AppLinkDeprecated} from "@/shared/ui/deprecated/AppLink";
import {HStack, VStack} from "@/shared/ui/redesigned/Stack";
import {getRouteProfile} from "@/shared/const/router";
import {ToggleFeatures, toggleFeatures} from "@/shared/lib/features";
import {Avatar} from "@/shared/ui/redesigned/Avatar";
import {Text} from "@/shared/ui/redesigned/Text";
import {AppLink} from "@/shared/ui/redesigned/AppLink";
import {Card} from "@/shared/ui/redesigned/Card";


interface CommentCardProps {
    className?: string;
    comment: Comment,
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {

    const {className, comment, isLoading} = props

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated
    })

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
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Card padding={'24'} border={'partial'} max>
                    <VStack
                        align={"start"}
                        max
                        gap={'4'}
                        className={classNames('', {}, [className])}
                    >
                        <AppLink to={getRouteProfile(comment.user.id)}>
                            <HStack gap={'4'}>
                                {comment.user.avatar ? <Avatar size={40} src={comment.user.avatar}/> : null}
                                <Text bold className={cls.username} text={comment.user.username}/>
                            </HStack>
                        </AppLink>
                        <Text text={comment.text}/>
                    </VStack>
                </Card>
            }
            off={
                <VStack
                    align={"start"}
                    max
                    gap={'4'}
                    className={classNames(cls.CommentCard, {}, [className])}
                >
                    <AppLinkDeprecated to={getRouteProfile(comment.user.id)} className={cls.header}>
                        {comment.user.avatar ? <AvatarDeprecated size={40} src={comment.user.avatar}/> : null}
                        <TextDeprecated className={cls.username} title={comment.user.username}/>
                    </AppLinkDeprecated>
                    <TextDeprecated className={cls.text} text={comment.text}/>
                </VStack>
            }
        />

    );
});


