import {classNames} from "shared/lib/classNames/classNames";
import cls from './NotificationsButton.module.scss'
import {memo, useCallback, useState} from "react";
import {Popover} from "shared/ui/Popups";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Icon} from "shared/ui/Icon/Icon";
import NotificationsIcon from "shared/assets/icons/notification-20-20.svg";
import {NotificationList} from "entities/Notification";
import {Drawer} from "shared/ui/Drawer/Drawer";
import {BrowserView, MobileView} from "react-device-detect";

interface notificationsButtonProps {
    className?: string;
}

export const NotificationsButton = memo((props: notificationsButtonProps) => {
    const {className} = props
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpenDrawer(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
        setIsOpenDrawer(false)
    }, [])

    const trigger = (
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationsIcon} inverted/>
        </Button>
    )

    return (
        <>
            <BrowserView>
                <Popover
                    className={classNames(cls.NotificationsButton, {}, [className])}
                    direction={'bottom-left'}
                    trigger={trigger}>
                    <NotificationList className={cls.NotificationsList}/>
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpenDrawer} onClose={onCloseDrawer}>
                    <NotificationList/>
                </Drawer>
            </MobileView>
        </>
    );
});
