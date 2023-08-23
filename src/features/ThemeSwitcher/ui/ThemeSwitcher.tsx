import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ThemeSwitcher.module.scss'
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {memo} from "react";
import {Theme} from "@/shared/const/theme";
import {useTheme} from "@/shared/lib/hooks/useTheme/useTheme";


interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({className}: ThemeSwitcherProps) => {

    const {theme, toggleTheme} = useTheme()

    return (
        <Button
            onClick={toggleTheme}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            theme={ButtonTheme.CLEAR}
        >
            {theme === Theme.DARK ? <DarkIcon/> : <LightIcon/>}
        </Button>
    );
});
