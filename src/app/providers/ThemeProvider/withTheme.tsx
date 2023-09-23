import {ComponentType} from "react";
import {useJsonSettings} from "@/entities/User";
import ThemeProvider from "@/app/providers/ThemeProvider/ui/ThemeProvider";


// HOC для получения темы из json settings с бэкэнда
export const withTheme = (Component: ComponentType) => {
    return () => {
        const {theme: defaultTheme} = useJsonSettings()
        return (
            <ThemeProvider initialTheme={defaultTheme}>
                <Component/>
            </ThemeProvider>
        )
    }
}