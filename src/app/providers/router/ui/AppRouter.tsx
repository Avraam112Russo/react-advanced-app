import React, {memo, Suspense, useMemo} from 'react';
import {Route, Routes} from "react-router-dom";
import {AboutPage} from "pages/aboutPage";
import {MainPage} from "pages/mainPage";
import {routeConfig} from "shared/config/routeConfig/RouteConfig";
import {PageLoader} from "widgets/pageLoader/PageLoader";
import {useSelector} from "react-redux";
import {StateSchema} from "app/providers/storeProvider";

const AppRouter = () => {
    const iSAuth_User = useSelector((state: StateSchema) => state.user?.userAuthData)
    const routes = useMemo(() => {
        return Object.values(routeConfig).filter((route) => {
            if (route.authOnly && !iSAuth_User) {
                return false;
            }
            return true;
        })
    }, [iSAuth_User])
    return (
        <Suspense fallback={<PageLoader/>}>{/*we need suspense for lazy loading components*/}
            <Routes>
                {routes.map(({path, element}) => (
                    <Route key={path} path={path} element={
                        <div className={"page-wrapper"}>
                            {element}
                        </div>
                    } />

                ))}
            </Routes>

        </Suspense>
    );
};

export default memo(AppRouter);