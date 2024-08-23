import {RouteProps} from "react-router-dom";
import {AboutPage} from "pages/aboutPage";
import {MainPage} from "pages/mainPage";
import {NotFoundPage} from "pages/notFoundPage";
import {ProfilePage} from "pages/profilePage";
import {ArticlePage} from "pages/articlePage";
import {ArticleDetailsPage} from "pages/articleDetailsPage";
import {ArticleDetailsEditPage} from "pages/articleDetailsEditPage";

export type AppRouteProps = RouteProps & {
    authOnly?:boolean // for authentication users only
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLE = 'article',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',



    // last
    NOT_FOUND = 'not_found',

}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.NOT_FOUND]: '*',
    [AppRoutes.ARTICLE]:'/articles',
    [AppRoutes.ARTICLE_DETAILS]:'/article_details/', // + :id
    [AppRoutes.ARTICLE_CREATE]:'/article_details/new',
    [AppRoutes.ARTICLE_EDIT]:'/article_details/edit/:id', // + :id

};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {


    // all pages with lazy loading, exclude NotFoundPAge
    // example: export {MainPageLazy as MainPage}

    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage/>,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile + ":id",
        element: <ProfilePage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE]: {
        path: RoutePath.article,
        element: <ArticlePage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: RoutePath.article_details + ":id",
        element: <ArticleDetailsPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: RoutePath.article_create,
        element: <ArticleDetailsEditPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: RoutePath.article_edit,
        element: <ArticleDetailsEditPage/>,
        authOnly: true
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    }
};