import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {AboutPage} from "pages/aboutPage";
import {MainPage} from "pages/mainPage";
import {routeConfig} from "shared/config/routeConfig/RouteConfig";

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>{/*we need suspense for lazy loading components*/}
            <Routes>
                {Object.values(routeConfig).map(({path, element}) => (
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

export default AppRouter;