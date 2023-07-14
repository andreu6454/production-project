import { MainPage } from "pages/MainPage";
import {RouteProps} from "react-router-dom";
import {AboutPage} from "pages/AboutPage";
import {NotFoundPage} from "pages/NotFoundPage";
export enum AppRoutes {
    Main = 'main',
    ABOUT = 'about',
    NOTFOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Main]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.NOTFOUND]: '*'
}


export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.Main]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />
    },
    [AppRoutes.NOTFOUND]:{
        path: RoutePath.not_found,
        element: <NotFoundPage/>
    }
}