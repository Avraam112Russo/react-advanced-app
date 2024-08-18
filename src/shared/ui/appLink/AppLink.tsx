import {classNames} from "shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss"
import {Link, LinkProps} from "react-router-dom";
import React, {FC, memo} from "react";



export enum AppThemeLink{
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}
export interface AppLinkProps extends LinkProps {
    className?: string,
    theme?: AppThemeLink
}
export const AppLink:FC<AppLinkProps> = memo((props) => {
    const {
        to,
        children,
        theme = AppThemeLink.SECONDARY,
        className,
        ...otherProps
    } = props;


    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}{/*text inside the link*/}
        </Link>
    );
});
