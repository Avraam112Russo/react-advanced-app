import {classNames} from "shared/lib/classNames/classNames";
import cls from "./SideBarItem.module.scss"
import {AppLink, AppThemeLink} from "shared/ui/appLink/AppLink";
import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {SIdeBarItemType} from "widgets/sideBar/model/item";
import {useSelector} from "react-redux";
import {StateSchema} from "app/providers/storeProvider";

export interface SideBarItemProps {
    item?:SIdeBarItemType,
    collapsed?:boolean,
}


// memo === useMemo()
// useMemo -> cache component <SideBarItem/>, don't render again while dependencies array will not change
export const SideBarItem = memo(({item, collapsed}:SideBarItemProps) => {
    const {t} = useTranslation();

    const isAuth = useSelector((state:StateSchema) => state.user.userAuthData)


    // if user not login
    if(item.authOnly && !isAuth){
        return null;
    }
        //usage map() we implements for each sidebar item this element
    return (
        <AppLink
            className={classNames(cls.item, {[cls.collapsed]:collapsed}, [])}
            to={item.path}>
            <item.icon className={cls.icon}/>
            <span className={classNames(cls.link)}>{t(item.text)}</span>
        </AppLink>

    );
});