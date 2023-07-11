import { MainPage } from "pages/MainPage";
import {RouteProps} from "react-router-dom";
import {AboutPage} from "pages/AboutPage";
export enum AppRoutes {
    Main = 'main',
    ABOUT = 'about'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Main]: '/',
    [AppRoutes.ABOUT]: '/about'
}


export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.Main]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />
    }
}