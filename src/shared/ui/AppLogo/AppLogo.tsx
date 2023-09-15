import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './AppLogo.module.scss'
import {memo} from "react";
import {useTranslation} from "react-i18next";
import AppSvg from '@/shared/assets/icons/app-image.svg';
import {HStack} from "@/shared/ui/Stack";

interface AppLogoProps {
    className?: string;
}

export const AppLogo = memo((props: AppLogoProps) => {
    const {className} = props
    const {t} = useTranslation()

    return (
        <HStack
            max
            justify={'center'}
            className={classNames(cls.AppLogoWrapper, {}, [className])
            }>
            <div className={cls.gradientBig}/>
            <div className={cls.gradientSmall}/>
            <AppSvg className={cls.AppLogo}/>
        </HStack>
    );
});
