import React, {Suspense, useContext, useEffect, useState} from 'react';

import {useTheme} from "app/providers/themeProvider";
import {classNames} from "shared/lib/classNames/classNames";
import {AboutPage} from "pages/aboutPage";
import {MainPage} from "pages/mainPage";
import {AppRouter} from "app/providers/router";
import {NavBar} from "widgets/navBar";
import {SideBar} from "widgets/sideBar";
import {useTranslation} from "react-i18next";
import "shared/config/i18n/i18n"
import {Modal} from "shared/ui/modal/Modal";
import {Button} from "shared/ui/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "entities/user";
import {Select, Select_Type_Option} from "shared/ui/select/Select";
import {StateSchema} from "app/providers/storeProvider";



const App = () => {
    const {theme} = useTheme();
    const[isOpenModalWindow, setIsOpenModalWindow] = useState(false);
    const dispatch = useDispatch();
    const init_user = useSelector((state:StateSchema) => state?.user?._inited);

    // set state user auth after user get successfully auth, close our app and open again
    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch]);



    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback={<div>Loading...</div>}>
                {/*<Suspense/> for i18n translation*/}
            <NavBar/>


            <div  className={classNames("content-page")}>
            <SideBar/>

                {init_user && <AppRouter/>}
            </div>
            </Suspense>
        </div>
    );
};

export default App;