import React from 'react';
import {Link} from "react-router-dom";
import {classNames} from "shared/lib/classNames";
import cls from "./NavBar.module.scss"
import {AppLink, AppThemeLink} from "shared/ui/appLink/AppLink";
import {ThemeSwitcher} from "widgets/themeSwitcher";
export interface NavBarProps {
    className?: string;
}
export const NavBar = ({className}:NavBarProps) => {
    return (
        <div className={classNames(cls.navbar)}>

            <div className={classNames(cls.links)}>
                <AppLink
                    className={classNames(cls.mainPageLink)} to={"/"}>Главная</AppLink>
                <AppLink to={"/about"}>О сайте</AppLink>
            </div>

        </div>
    );
};