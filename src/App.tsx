import React, {Suspense, useContext, useState} from 'react';
import "./app/styles/index.scss"
import {Link, Route, Routes} from 'react-router-dom';

import {useTheme} from "app/providers/themeProvider";
import {classNames} from "shared/lib/classNames";
import {AboutPage} from "pages/aboutPage";
import {MainPage} from "pages/mainPage";
import {AppRouter} from "app/providers/router";
import {NavBar} from "widgets/navBar";



const App = () => {
    const {theme, toggleTheme} = useTheme();
    return (
        <div className={classNames('app', {}, [theme])}>

            <NavBar/>
            <button onClick={toggleTheme}>
                TOGGLE
            </button>
            <AppRouter/>
        </div>
    );
};

export default App;