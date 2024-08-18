import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ThemeSwitcher.module.scss"
import React, {memo} from "react";
import {Theme, useTheme} from "app/providers/themeProvider";

import DarkIcon from "shared/assets/icons/theme-dark.svg"
import LightIcon from "shared/assets/icons/theme-light.svg"
import {Button, ButtonTheme} from "shared/ui/button/Button";


export interface ThemeSwitcherProps {
    className?: string;
}



// memo === useMemo()
// useMemo -> cache component <ThemeSwitcher/>, don't render again while dependencies array will not change
export const ThemeSwitcher = memo(({className}:ThemeSwitcherProps) => {
    const {toggleTheme, theme} = useTheme();

    return (
        <Button
            buttonTheme={ButtonTheme.CLEAR}
            className={classNames(cls.themeSwitcher, {}, [className])}
            onClick={toggleTheme}>
            {theme === Theme.LIGHT ? <LightIcon/> : <DarkIcon/>}
        </Button>
    );
});
