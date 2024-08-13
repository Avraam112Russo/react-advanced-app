import {classNames} from "shared/lib/classNames";
import cls from "./AppLink.module.scss"
import {Link, LinkProps} from "react-router-dom";
import React, {FC} from "react";



export enum AppThemeLink{
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}
export interface AppLinkProps extends LinkProps {
    className?: string,
    theme?: AppThemeLink
}
export const AppLink:FC<AppLinkProps> = (props) => {
    const {
        to,
        children,
        theme = AppThemeLink.PRIMARY,
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
};
