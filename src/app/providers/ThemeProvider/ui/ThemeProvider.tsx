import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {ThemeContext} from "../../../../shared/lib/context/ThemeContext";
import {Theme} from "@/shared/const/theme";
import {useJsonSettings} from "@/entities/User";
import {LOCAL_STORAGE_THEME_KEY} from "@/shared/const/localStorage";


interface ThemeProviderProps {
    children: ReactNode
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme

const ThemeProvider = ({children}: ThemeProviderProps) => {
    const {theme: defaultTheme} = useJsonSettings()

    const [isThemeInited, setIsThemeInited] = useState(false)

    const [theme, setTheme] =
        useState<Theme>(defaultTheme || fallbackTheme || Theme.LIGHT);


    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme)
            setIsThemeInited(true)
        }
    }, [defaultTheme]);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
    }, [theme]);


    const defaultProps = useMemo(() => ({
            theme: theme,
            setTheme: setTheme
        }), [theme]
    )

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;