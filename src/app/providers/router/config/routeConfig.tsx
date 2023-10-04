import {MainPage} from "@/pages/MainPage";
import {AboutPage} from "@/pages/AboutPage";
import {NotFoundPage} from "@/pages/NotFoundPage";
import {ProfilePage} from "@/pages/ProfilePage";
import {ArticlesPage} from "@/pages/ArticlesPage";
import {ArticleDetailsPage} from "@/pages/ArticleDetailsPage";
import {ArticleEditPage} from "@/pages/ArticleEditPage";
import {AdminPanelPage} from "@/pages/AdminPanelPage";
import {UserRole} from "@/entities/User/model/types/userSchema";
import {ForbiddenPage} from "@/pages/ForbiddenPage";
import {
    AppRoutes,
    getRouteAbout, getRouteAdmin, getRouteArticleCreate,
    getRouteArticleDetails, getRouteArticleEdit,
    getRouteArticles, getRouteForbidden,
    getRouteMain, getRouteMovies, getRouteMoviesDetails, getRouteProfile, getRouteSettings,
} from "@/shared/const/router";
import {AppRouteProps} from "@/shared/types/router";
import {SettingsPage} from "@/pages/SettingsPage";
import {MoviesPage} from "@/pages/MoviesPage";
import {MovieDetailsPage} from "@/pages/MovieDetailsPage/";


export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.Main]: {
        path: getRouteMain(),
        element: <MainPage/>,
        authOnly: false
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage/>,
        authOnly: false
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage/>,
        authOnly: false
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage/>,
        authOnly: true
    },
    [AppRoutes.MOVIES]: {
        path: getRouteMovies(),
        element: <MoviesPage/>,
        authOnly: true
    },
    [AppRoutes.MOVIES_DETAILS]: {
        path: getRouteMoviesDetails(':id'),
        element: <MovieDetailsPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage/>,
        authOnly: true
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage/>,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER]
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage/>
    },
    [AppRoutes.NOTFOUND]: {
        path: '*',
        element: <NotFoundPage/>,
        authOnly: false
    },
}