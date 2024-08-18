import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Text.module.scss"
import {memo} from "react";
export enum TextTheme{
    NORMAL = "normal",
    ERROR = "error",
}
export enum TextAlign{
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center'
}
export interface TextProps {
    className?: string,
    title?:string,
    text:string,
    theme?: TextTheme,
    align?: TextAlign
}
//memo() cached component
export const Text = memo((props:TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.NORMAL, // default
        align = TextAlign.LEFT
    } = props;
    const MODS_CLASSNAMES = {[cls[theme]]: true, [cls[align]]: true}
    return (
        <div className={classNames(cls.text, MODS_CLASSNAMES, [className])}>
            {title && <p className={classNames(cls.title)}>{title}</p>}
            {text && <p className={classNames(cls.text)}>{text}</p>}
        </div>
    );
});
