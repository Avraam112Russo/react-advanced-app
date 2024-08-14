import {classNames} from "shared/lib/classNames";
import cls from "./Button.module.scss"
import {ButtonHTMLAttributes, FC} from "react";



export enum ThemeButton {
    CLEAR = "clear",
    OUTLINE = "outline"
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    buttonTheme?: ThemeButton

}
export const Button:FC<ButtonProps> = (props) => {
    const {children,
        className,
        buttonTheme,
        ...otherProps} = props;

    return (
        <button
            {...otherProps}
            className={classNames(cls.Button, {}, [className, cls[buttonTheme]])}>
            {children}
        </button>
    );
};
