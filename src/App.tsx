import React, {Suspense, useContext, useState} from 'react';
import "./app/styles/index.scss"
import {Link, Route, Routes} from 'react-router-dom';

import {useTheme} from "app/providers/themeProvider";
import {classNames} from "shared/lib/classNames";
import {AboutPage} from "pages/aboutPage";
import {MainPage} from "pages/mainPage";
import {AppRouter} from "app/providers/router";
import {NavBar} from "widgets/navBar";
import {SideBar} from "widgets/sideBar";



const App = () => {
    const {theme} = useTheme();
    return (
        <div className={classNames('app', {}, [theme])}>
            <NavBar/>
            <div  className={classNames("content-page")}>
            <SideBar/>
            <AppRouter/>
            </div>
        </div>
    );
};

export default App;