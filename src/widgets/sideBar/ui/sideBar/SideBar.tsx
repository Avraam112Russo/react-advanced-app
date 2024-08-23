import {classNames} from "shared/lib/classNames/classNames";
import cls from "./SideBar.module.scss"
import React, {memo, useMemo, useState} from "react";
import {Button, ButtonSIze, ButtonTheme} from "shared/ui/button/Button";
import {ThemeSwitcher} from "widgets/themeSwitcher";
import {LangSwitcher} from "widgets/langSwitcher/LangSwitcher";
import {useTranslation} from "react-i18next";

import {SideBarItem} from "widgets/sideBar/ui/sideBarItem/SideBarItem";
import {useSelector} from "react-redux";
import {StateSchema} from "app/providers/storeProvider";
import {getSideBarItemSelector} from "widgets/sideBar/model/selectors/GetSideBarItemSelector";

export interface SideBarProps {
    className?: string;
}
// memo() cached component
export const SideBar = memo(({className}:SideBarProps) => {
    const [collapse, setCollapsed] = useState(false); // сайд бар развернут или свернут
    const onToggle = () => {
        setCollapsed(prevState => !prevState);
    }
    const {t} = useTranslation();
    const SideBarItemList = useSelector(getSideBarItemSelector) // get sidebar items

    // useMemo -> cache component <SideBarItem/>, while dependencies array will not change [collapse]
    const itemsList = useMemo(() => SideBarItemList.map((item) => (

            <SideBarItem
                key={item.path}
                collapsed={collapse}
                item={item} />
        )
    ), [collapse, SideBarItemList])

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


                {itemsList}



                </div>

            <div className={classNames(cls.switchers)}>

                <ThemeSwitcher/>
                <LangSwitcher
                    shortlyWhenSideBarCollapse={collapse === true ? true : false}
                    className={classNames(cls.lang, {}, [])}/>
            </div>
        </div>
    );
});
