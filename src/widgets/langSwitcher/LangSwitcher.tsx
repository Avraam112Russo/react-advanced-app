import {classNames} from "shared/lib/classNames";
import cls from "./LangSwitcher.module.scss"
import {useTranslation} from "react-i18next";
import React from "react";
import {Button, ThemeButton} from "shared/ui/button/Button";

export interface LangSwitcherProps {
    className?: string;
}
export const LangSwitcher = ({className}:LangSwitcherProps) => {
        const {t, i18n} = useTranslation();
        const toggleLanguage =  async () => {
            i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
        }
    return (
           <Button
               className={classNames(cls.LangSwitcher, {}, [className])}
               buttonTheme={ThemeButton.CLEAR}
               onClick={toggleLanguage}>
               {t('Язык')}
           </Button>
    );
};
