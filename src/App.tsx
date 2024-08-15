import React, {Suspense, useContext, useEffect, useState} from 'react';

import {useTheme} from "app/providers/themeProvider";
import {classNames} from "shared/lib/classNames";
import {AboutPage} from "pages/aboutPage";
import {MainPage} from "pages/mainPage";
import {AppRouter} from "app/providers/router";
import {NavBar} from "widgets/navBar";
import {SideBar} from "widgets/sideBar";
import {useTranslation} from "react-i18next";
import "shared/config/i18n/i18n"
import {Modal} from "shared/ui/modal/Modal";
import {Button} from "shared/ui/button/Button";



const App = () => {
    const {theme} = useTheme();
    const[isOpenModalWindow, setIsOpenModalWindow] = useState(false);


    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback={<div>Loading...</div>}>
                {/*<Suspense/> for i18n translation*/}
            <NavBar/>
                <Button onClick={() => setIsOpenModalWindow(true)}>
                    OPEN
                </Button>

            <div  className={classNames("content-page")}>
            <SideBar/>
            <AppRouter/>
            </div>
            </Suspense>
        </div>
    );
};

export default App;