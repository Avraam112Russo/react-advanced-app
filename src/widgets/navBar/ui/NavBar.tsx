import React from 'react';
import {Link} from "react-router-dom";
import {classNames} from "shared/lib/classNames";
import cls from "./NavBar.module.scss"
import {AppLink, AppThemeLink} from "shared/ui/appLink/AppLink";
import {ThemeSwitcher} from "widgets/themeSwitcher";
import {useTranslation} from "react-i18next";
export interface NavBarProps {
    className?: string;
}
export const NavBar = ({className}:NavBarProps) => {
    const {t} = useTranslation();
    return (
        <div className={classNames(cls.navbar)}>

            <div className={classNames(cls.links)}>
                <AppLink
                    className={classNames(cls.mainPageLink)} to={"/"}>{t('Главная')}</AppLink>
                <AppLink to={"/about"}>{t('О сайте')}</AppLink>
            </div>

        </div>
    );
};