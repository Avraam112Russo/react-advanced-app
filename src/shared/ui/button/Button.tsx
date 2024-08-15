import {classNames} from "shared/lib/classNames";
import cls from "./Button.module.scss"
import {ButtonHTMLAttributes, FC} from "react";



export enum ButtonTheme {
    CLEAR = "clear",
    OUTLINE = "outline",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "background__inverted",
}
export enum ButtonSIze{
    SIZE_M = 'size_m',
    SIZE_L = 'size_l',
    SIZE_XL = 'size_xl',
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    buttonTheme?: ButtonTheme
    square?: boolean,
    size?: ButtonSIze
}
export const Button:FC<ButtonProps> = (props) => {
    const {children,
        className,
        square,
        buttonTheme,
        size,
        ...otherProps} = props;

    const MODS: Record<string, boolean> = {
        [cls.square]: square
    }

    return (
        <button
            {...otherProps}
            className={classNames(cls.Button, MODS, [className, cls[buttonTheme], cls[size]])}>
            {children}
        </button>
    );
};
