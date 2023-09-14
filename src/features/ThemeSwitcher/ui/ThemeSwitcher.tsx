import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ThemeSwitcher.module.scss'
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import {Button, ButtonTheme} from "@/shared/ui/Button";
import {memo, useCallback} from "react";
import {Theme} from "@/shared/const/theme";
import {useTheme} from "@/shared/lib/hooks/useTheme/useTheme";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {saveJsonSettings} from "@/entities/User";


interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({className}: ThemeSwitcherProps) => {

    const {theme, toggleTheme} = useTheme()

    const dispatch = useAppDispatch()

    const onToggleHandle = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({theme: newTheme}))
        })
    }, [dispatch, toggleTheme])

    return (
        <Button
            onClick={onToggleHandle}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            theme={ButtonTheme.CLEAR}
        >
            {theme === Theme.DARK ? <DarkIcon/> : <LightIcon/>}
        </Button>
    );
});
