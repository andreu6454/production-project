import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from "react";
import {useNotifications} from "../../api/notificationApi";
import {VStack} from "@/shared/ui/redesigned/Stack";
import {NotificationItem} from "../NotificationItem/NotificationItem";
import {Skeleton as SkeletonDeprecated} from "@/shared/ui/deprecated/Skeleton";
import {Skeleton as SkeletonRedesigned} from "@/shared/ui/redesigned/Skeleton";
import {toggleFeatures} from "@/shared/lib/features";

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const {className} = props

    const {data, isLoading} = useNotifications(null, {
        //запрос за новыми уведомлениями раз в 10 секунд
        pollingInterval: 10000
    })

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated
    })


    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames('', {}, [className])}
            >
                <Skeleton width="100%" border="8px" height="80px"/>
                <Skeleton width="100%" border="8px" height="80px"/>
                <Skeleton width="100%" border="8px" height="80px"/>
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames('', {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item}/>
            ))}
        </VStack>
    );
});