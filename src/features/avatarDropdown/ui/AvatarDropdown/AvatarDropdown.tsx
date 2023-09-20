import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo, useCallback} from 'react';
import {Avatar as AvatarDeprecated} from "@/shared/ui/deprecated/Avatar";
import {DropDown as DropDownDeprecated} from "@/shared/ui/deprecated/Popups";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData, isUserAdmin, isUserManager, userActions} from "@/entities/User";
import {getRouteAdmin, getRouteProfile, getRouteSettings} from "@/shared/const/router";
import {ToggleFeatures} from "@/shared/lib/features";
import {DropDown} from "@/shared/ui/redesigned/Popups";
import {Avatar} from "@/shared/ui/redesigned/Avatar";

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const {className} = props;
    const {t} = useTranslation();

    const authData = useSelector(getUserAuthData)
    const dispatch = useDispatch()
    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])


    const isAdminPanelAvailable = isAdmin || isManager

    if (!authData) {
        return null
    }


    const items = [
        ...(isAdminPanelAvailable ? [{
            content: t("Админка"),
            href: getRouteAdmin()
        }] : []),
        {
          content: t("Настройки"),
          href: getRouteSettings()
        },
        {
            content: t("Профиль"),
            href: getRouteProfile(authData.id)
        },
        {
            content: t("Выйти"),
            onClick: onLogout
        }
    ]
    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <DropDown
                    className={classNames('', {}, [className])}
                    direction={'bottom-left'}
                    trigger={<Avatar size={40} src={authData?.avatar}/>}
                    items={items}
                />
            }
            off={
                <DropDownDeprecated
                    className={classNames('', {}, [className])}
                    direction={'bottom-left'}
                    trigger={<AvatarDeprecated fallbackInverted size={30} src={authData?.avatar}/>}
                    items={items}
                />
            }
        />

    );
});