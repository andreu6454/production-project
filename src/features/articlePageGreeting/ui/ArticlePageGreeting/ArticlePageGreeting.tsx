import {useTranslation} from 'react-i18next';
import {memo, useEffect, useState} from 'react';
import {Modal} from "@/shared/ui/deprecated/Modal";
import {Text} from "@/shared/ui/deprecated/Text";
import {saveJsonSettings, useJsonSettings} from "@/entities/User";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Drawer} from "@/shared/ui/deprecated/Drawer";
import {isMobile} from "react-device-detect";

export const ArticlePageGreeting = memo(() => {
    const {t} = useTranslation();

    const {isArticlesPageWasOpened} = useJsonSettings();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({isArticlesPageWasOpened: true}));
        }
    }, [dispatch, isArticlesPageWasOpened]);

    const onClose = () => {
        setIsOpen(false)
    }


    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={onClose}>
                <Text
                    title={t('Добро пожаловать на страницу статей')}
                    text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
                />
            </Drawer>
        )
    }
    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            <Text
                title={t('Добро пожаловать на страницу статей')}
                text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
            />
        </Modal>
    );
});