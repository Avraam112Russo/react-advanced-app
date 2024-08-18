import React from "react";
import {RoutePath} from "shared/config/routeConfig/RouteConfig";
import MainIcon from "shared/assets/icons/main-icon.svg";
import AboutUsIcon from "shared/assets/icons/about-us-icon.svg";
import ProfileIcon from "shared/assets/icons/profile-icon.svg";




export interface SIdeBarItemType {
    path?:string,
    text?:string,
    icon?: React.VFC<React.SVGProps<SVGSVGElement>>,
    authOnly?:boolean
}

export const SideBarItemList: SIdeBarItemType[] = [
    {
        path: RoutePath.main,
        text: 'Главная',
        icon: MainIcon
    },
    {
        path: RoutePath.about,
        text: 'О сайте',
        icon: AboutUsIcon
    },
    {
        path: RoutePath.profile,
        text: 'Профиль',
        icon: ProfileIcon,
        authOnly:true
    },
]