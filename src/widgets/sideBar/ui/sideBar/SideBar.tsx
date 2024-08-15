import {classNames} from "shared/lib/classNames";
import cls from "./SideBar.module.scss"
import React, {useState} from "react";
import {Button, ButtonSIze, ButtonTheme} from "shared/ui/button/Button";
import {ThemeSwitcher} from "widgets/themeSwitcher";
import {LangSwitcher} from "widgets/langSwitcher/LangSwitcher";
import {AppLink} from "shared/ui/appLink/AppLink";
import {useTranslation} from "react-i18next";
import {RoutePath} from "shared/config/routeConfig/RouteConfig";
import MainIcon from "shared/assets/icons/main-icon.svg"
import AboutUsIcon from "shared/assets/icons/about-us-icon.svg"

export interface SideBarProps {
    className?: string;
}
export const SideBar = ({className}:SideBarProps) => {
    const [collapse, setCollapsed] = useState(false); // сайд бар развернут или свернут
    const onToggle = () => {
        setCollapsed(prevState => !prevState);
    }
    const {t} = useTranslation();
    return (
        <div
            data-testid="sideBar"
            className={classNames(cls.SideBar, {[cls.collapsed]: collapse}, [className])}>

           <Button
               square
               size={ButtonSIze.SIZE_XL}
               buttonTheme={ButtonTheme.BACKGROUND_INVERTED}
               className={classNames(cls.collapseBtn, )}
               onClick={onToggle}>

               {collapse === true ? ">" : "<"}

           </Button>


            <div className={classNames(cls.items)}>

                <AppLink
                    className={cls.item}
                    to={RoutePath.main}>
                    <MainIcon className={cls.icon}/>
                    <span className={classNames(cls.link)}>{t('Главная')}</span>
                </AppLink>
                <AppLink
                    className={cls.item}
                    to={RoutePath.about}>
                    <AboutUsIcon className={cls.icon}/>
                    <span className={classNames(cls.link)}>
                    {t('О сайте')}
                    </span>
                </AppLink>
                </div>

            <div className={classNames(cls.switchers)}>

                <ThemeSwitcher/>
                <LangSwitcher
                    shortlyWhenSideBarCollapse={collapse === true ? true : false}
                    className={classNames(cls.lang, {}, [])}/>
            </div>
        </div>
    );
};
