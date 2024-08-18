import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss"
import {ButtonHTMLAttributes, FC, memo} from "react";



export enum ButtonTheme {
    CLEAR = "clear",
    OUTLINE = "outline",
    OUTLINE_RED = "outline_red",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "background__inverted",
}
export enum ButtonSIze{
    SIZE_M = 'size_m',
    SIZE_L = 'size_l',
    SIZE_XL = 'size_xl',
}
// extends ButtonHTMLAttributes<HTMLButtonElement> for retrieve all basic props from React button
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    buttonTheme?: ButtonTheme
    square?: boolean,
    size?: ButtonSIze,
    disabled?: boolean
}


// if component have a children, we don't need memo(), BUT!!! button in 99% case have a simple static string and we can use memo()
export const Button:FC<ButtonProps> = memo((props) => {
    const {children,
        className,
        square,
        buttonTheme,
        size,
        disabled,
        ...otherProps} = props;

    const MODS: Record<string, boolean> = {
        [cls.square]: square,
        [cls.disabled]:disabled
    }

    return (
        <button
            {...otherProps}
            disabled={disabled}
            className={classNames(cls.Button, MODS, [className, cls[buttonTheme], cls[size]])}>
            {children}
        </button>
    );
});
