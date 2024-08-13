import {classNames} from "shared/lib/classNames";
import cls from "./ThemeSwitcher.module.scss"
import React from "react";
import {Theme, useTheme} from "app/providers/themeProvider";

import DarkIcon from "shared/assets/icons/theme-dark.svg"
import LightIcon from "shared/assets/icons/theme-light.svg"
import {Button, ThemeButton} from "shared/ui/button/Button";


export interface ThemeSwitcherProps {
    className?: string;
}
export const ThemeSwitcher = ({className}:ThemeSwitcherProps) => {
    const {toggleTheme, theme} = useTheme();

    return (
        <Button
            buttonTheme={ThemeButton.CLEAR}
            className={classNames(cls.themeSwitcher, {}, [className])}
            onClick={toggleTheme}>
            {theme === Theme.LIGHT ? <LightIcon/> : <DarkIcon/>}
        </Button>
    );
};
