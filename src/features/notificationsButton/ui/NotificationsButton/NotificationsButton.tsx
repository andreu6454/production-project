import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './NotificationsButton.module.scss'
import {memo, useCallback, useState} from "react";
import {Popover as PopoverDeprecated} from "@/shared/ui/deprecated/Popups";
import {Button as ButtonDeprecated, ButtonTheme} from "@/shared/ui/deprecated/Button";
import {Icon as IconDeprecated} from "@/shared/ui/deprecated/Icon";
import NotificationsIconDeprecated from "@/shared/assets/icons/notification-20-20.svg";
import NotificationsIcon from "@/shared/assets/icons/notification.svg";
import {NotificationList} from "@/entities/Notification";
import {BrowserView, MobileView} from "react-device-detect";
import {Drawer} from "@/shared/ui/redesigned/Drawer";
import {ToggleFeatures} from "@/shared/lib/features";
import {Icon} from "@/shared/ui/redesigned/Icon";
import {Popover} from "@/shared/ui/redesigned/Popups";

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
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Icon Svg={NotificationsIcon} clickable onClick={onOpenDrawer}/>
            }
            off={
                <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
                    <IconDeprecated Svg={NotificationsIconDeprecated} inverted/>
                </ButtonDeprecated>
            }
        />
    )

    return (
        <>
            <BrowserView>
                <ToggleFeatures
                    feature={'isAppRedesigned'}
                    on={
                        <Popover
                            className={classNames(cls.NotificationsButton, {}, [className])}
                            direction={'bottom-left'}
                            trigger={trigger}>
                            <NotificationList className={cls.NotificationsList}/>
                        </Popover>
                    }
                    off={
                        <PopoverDeprecated
                            className={classNames(cls.NotificationsButton, {}, [className])}
                            direction={'bottom-left'}
                            trigger={trigger}>
                            <NotificationList className={cls.NotificationsList}/>
                        </PopoverDeprecated>
                    }
                />

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
