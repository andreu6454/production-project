import {memo, useCallback, useState} from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import {Button, ButtonTheme} from "@/shared/ui/deprecated/Button";
import {useTranslation} from "react-i18next";
import {LoginModal} from "@/features/AuthByUsername";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {Text, TextTheme} from "@/shared/ui/deprecated/Text";
import {AppLink, AppLinkTheme} from "@/shared/ui/deprecated/AppLink";
import {HStack} from "@/shared/ui/deprecated/Stack";
import {NotificationsButton} from "@/features/notificationsButton";
import {AvatarDropdown} from "@/features/avatarDropdown";
import {getRouteArticleCreate} from "@/shared/const/router";
import {ToggleFeatures} from "@/shared/lib/features";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {
    const {t} = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)


    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])


    if (authData) {
        return (
            <ToggleFeatures
                feature={"isAppRedesigned"}
                on={
                    <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
                        <HStack gap={'16'} className={cls.actions}>
                            <NotificationsButton/>
                            <AvatarDropdown/>
                        </HStack>
                    </header>}
                off={
                    <header className={classNames(cls.Navbar, {}, [className])}>
                        <Text
                            theme={TextTheme.INVERTED}
                            className={cls.appName}
                            title={t('cdts app')}
                        />
                        <AppLink
                            className={cls.createBtn}
                            theme={AppLinkTheme.SECONDARY}
                            to={getRouteArticleCreate()}
                        >
                            {t("Создать статью")}
                        </AppLink>
                        <HStack gap={'16'} className={cls.actions}>
                            <NotificationsButton/>
                            <AvatarDropdown/>
                        </HStack>
                    </header>}
            />
        )
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.Links}
                onClick={onShowModal}
            >
                {t("Войти")}
            </Button>
            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>}
        </header>
    );
});






