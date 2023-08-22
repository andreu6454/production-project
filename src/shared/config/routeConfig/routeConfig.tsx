import {MainPage} from "@/pages/MainPage";
import {RouteProps} from "react-router-dom";
import {AboutPage} from "@/pages/AboutPage";
import {NotFoundPage} from "@/pages/NotFoundPage";
import {ProfilePage} from "@/pages/ProfilePage";
import {ArticlesPage} from "@/pages/ArticlesPage";
import {ArticleDetailsPage} from "@/pages/ArticleDetailsPage";
import {ArticleEditPage} from "@/pages/ArticleEditPage";
import {AdminPanelPage} from "@/pages/AdminPanelPage";
import {UserRole} from "@/entities/User/model/types/userSchema";
import {ForbiddenPage} from "@/pages/ForbiddenPage";

export type AppRouteProps = RouteProps & {
    authOnly?: boolean
    roles?: UserRole[]
}

export enum AppRoutes {
    Main = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',

    NOTFOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Main]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // +:id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAILS]: '/articles/', // +:id
    [AppRoutes.ARTICLE_CREATE]: '/articles/new',
    [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.FORBIDDEN]: '/forbidden',

    [AppRoutes.NOTFOUND]: '*'
}


export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.Main]: {
        path: RoutePath.main,
        element: <MainPage/>,
        authOnly: false
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage/>,
        authOnly: false
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLES]: {
        path: RoutePath.articles,
        element: <ArticlesPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RoutePath.article_details}:id`,
        element: <ArticleDetailsPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: `${RoutePath.article_edit}`,
        element: <ArticleEditPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: `${RoutePath.article_create}`,
        element: <ArticleEditPage/>,
        authOnly: true
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: `${RoutePath.admin_panel}`,
        element: <AdminPanelPage/>,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER]
    },
    [AppRoutes.FORBIDDEN]: {
        path: `${RoutePath.forbidden}`,
        element: <ForbiddenPage/>
    },
    [AppRoutes.NOTFOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage/>,
        authOnly: false
    },

}