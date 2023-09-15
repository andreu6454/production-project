import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ThemeSwitcher.module.scss'
import ThemeIcon from '@/shared/assets/icons/theme-light.svg'
import {Button, ButtonTheme} from "@/shared/ui/deprecated/Button";
import {memo, useCallback} from "react";
import {useTheme} from "@/shared/lib/hooks/useTheme/useTheme";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {saveJsonSettings} from "@/entities/User";
import {Icon} from "@/shared/ui/deprecated/Icon";


interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({className}: ThemeSwitcherProps) => {

    const {toggleTheme} = useTheme()

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
            <Icon Svg={ThemeIcon} width={40} height={40} inverted/>
        </Button>
    );
});
