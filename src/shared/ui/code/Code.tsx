import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Code.module.scss"
import {Button, ButtonTheme} from "shared/ui/button/Button";
import {Icon} from "shared/ui/icon/Icon";
import CopyButtonIcon from 'shared/assets/icons/about-us-icon.svg'
import {useCallback} from "react";
export interface CodeProps {
    className?: string,
    text?: string,
}
export const Code = ({className, text}:CodeProps) => {
    const onCopyCode = useCallback(() => {
    navigator.clipboard.writeText(text); // copy code after click button
    }, [text]);
    return (

        <pre className={classNames(cls.Code, {}, [className])}>
            <Button
                onClick={onCopyCode}
                buttonTheme={ButtonTheme.OUTLINE}
                className={classNames(cls.copyBtn)}>

                <Icon

                    Svg={CopyButtonIcon}/>

            </Button>
        <code >
            {text}
        </code>
        </pre>
    );
};
