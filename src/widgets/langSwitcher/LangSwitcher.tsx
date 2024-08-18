import {classNames} from "shared/lib/classNames/classNames";
import cls from "./LangSwitcher.module.scss"
import {useTranslation} from "react-i18next";
import React, {memo} from "react";
import {Button, ButtonTheme} from "shared/ui/button/Button";

export interface LangSwitcherProps {
    className?: string,
    shortlyWhenSideBarCollapse?: boolean
}
// memo === useMemo()
// useMemo -> cache component <LangSwitcher/>, don't render again while dependencies array will not change
export const LangSwitcher = memo(({className, shortlyWhenSideBarCollapse}:LangSwitcherProps) => {
        const {t, i18n} = useTranslation();
        const toggleLanguage =  async () => {
            i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
        }
    return (
           <Button
               className={classNames(cls.LangSwitcher, {}, [className])}
               buttonTheme={ButtonTheme.CLEAR}
               onClick={toggleLanguage}>
               {t(shortlyWhenSideBarCollapse === true ? 'Lan' : 'Язык')}
           </Button>
    );
});
