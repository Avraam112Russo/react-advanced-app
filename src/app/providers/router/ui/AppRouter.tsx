import React, {memo, Suspense, useCallback, useMemo} from 'react';
import {Route, Routes} from "react-router-dom";
import {AboutPage} from "pages/aboutPage";
import {MainPage} from "pages/mainPage";
import {AppRouteProps, AppRoutes, routeConfig} from "app/providers/router/routeConfig/RouteConfig";
import {PageLoader} from "widgets/pageLoader/PageLoader";
import {useSelector} from "react-redux";
import {StateSchema} from "app/providers/storeProvider";
import {RequireAuth} from "app/providers/router/ui/RequireAuth";

const AppRouter = () => {

    const render_with_require_auth_wrapper = useCallback((route:AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader/>}>{/*we need suspense for lazy loading components*/}
                <div className={"page-wrapper"}>
                    {route.element}
                </div>

            </Suspense>
        )
        return (

            // redirect to main page, if user don't log in
            <Route
                key={route.path}
                path={route.path}

                // if router is Auth only, wrap it usage </RequireAuth>
                element={
                route.authOnly ? <RequireAuth > {element}</RequireAuth> : element}
            />

            );
    }, [])
    return (
        <Suspense fallback={<PageLoader/>}>{/*we need suspense for lazy loading components*/}
            <Routes>
            {Object.values(routeConfig).map(render_with_require_auth_wrapper)}
        </Routes>


        </Suspense>
    );
};

export default memo(AppRouter);