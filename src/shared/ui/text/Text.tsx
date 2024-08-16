import {classNames} from "shared/lib/classNames";
import cls from "./Text.module.scss"
export enum TextTheme{
    NORMAL = "normal",
    ERROR = "error",
}
export interface TextProps {
    className?: string,
    title?:string,
    text:string,
    theme?: TextTheme
}
export const Text = (props:TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.NORMAL, // default
    } = props;
    return (
        <div className={classNames(cls.text, { [cls[theme]]: true }, [className])}>
            {title && <p className={classNames(cls.title)}>{title}</p>}
            {text && <p className={classNames(cls.text)}>{text}</p>}
        </div>
    );
};
