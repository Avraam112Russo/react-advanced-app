import {createSelector} from "@reduxjs/toolkit";
import {getUserAuthDataSelector} from "entities/user/model/selector/getUserAuthDataSelector";
import {RoutePath} from "app/providers/router/routeConfig/RouteConfig";
import MainIcon from "shared/assets/icons/main-icon.svg";
import AboutUsIcon from "shared/assets/icons/articles.svg";
import ProfileIcon from "shared/assets/icons/profile-icon.svg";
import ArticleIcon from "shared/assets/icons/articles.svg";

import {SIdeBarItemType} from "widgets/sideBar/model/types/SideBar";

export const getSideBarItemSelector = createSelector(
    getUserAuthDataSelector,
    userData => {
        const sideBarItemList: SIdeBarItemType[] = [
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

        ]

        // if user log in we show this sidebar item
        if (userData){
            sideBarItemList.push({
                    path: RoutePath.profile + userData.id,
                    text: 'Профиль',
                    icon: ProfileIcon,
                    authOnly:true
                });
            sideBarItemList.push(
                {
                    path: RoutePath.article,
                    text: 'Статьи',
                    icon: ArticleIcon,
                    authOnly:true
                }
            )
        }
        return sideBarItemList;
    }

)