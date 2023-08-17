import {classNames} from "shared/lib/classNames/classNames";
import cls from './NotificationsButton.module.scss'
import {memo} from "react";
import {Popover} from "shared/ui/Popups";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Icon} from "shared/ui/Icon/Icon";
import NotificationsIcon from "shared/assets/icons/notification-20-20.svg";
import {NotificationList} from "entities/Notification";

interface notificationsButtonProps {
    className?: string;
}

export const NotificationsButton = memo((props: notificationsButtonProps) => {
    const {className} = props


    return (
        <Popover
            className={classNames(cls.NotificationsButton, {}, [className])}
            direction={'bottom-left'}
            trigger={(
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon Svg={NotificationsIcon} inverted/>
                </Button>

            )}>
            <NotificationList className={cls.NotificationsList}/>
        </Popover>
    );
});
