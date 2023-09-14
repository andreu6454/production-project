import {ThemeContext} from "../../context/ThemeContext";
import {useContext} from "react";
import {Theme} from "@/shared/const/theme";

interface useThemeResult {
    toggleTheme: (saveAction: (theme: Theme) => void) => void,
    theme: Theme
}

export function useTheme(): useThemeResult {
    const {theme, setTheme} = useContext(ThemeContext)

    const toggleTheme = (saveAction: (theme: Theme) => void) => {
        let newTheme: Theme
        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT
                break
            case Theme.LIGHT:
                newTheme = Theme.PURPLE
                break
            case Theme.PURPLE:
                newTheme = Theme.DARK
                break
            default:
                newTheme = Theme.LIGHT
                break
        }
        setTheme?.(newTheme)
        document.body.className = newTheme
        saveAction(newTheme)
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme
    }
}