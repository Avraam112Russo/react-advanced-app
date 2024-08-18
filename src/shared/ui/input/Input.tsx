import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Input.module.scss"
import React, {InputHTMLAttributes, memo} from "react";


// usage Omit<> we can retrieve all necessary props and exclude unnecessary props
// we create our custom props 'value' and 'onChange' and exclude them
type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

export interface InputProps extends HtmlInputProps {
    className?: string,
    value?: string | number,
    onChange?: (value: string) => void, // change value
    readOnly?: boolean,
}

//memo() cached component
export const Input = memo((props:InputProps) => {
    const {
        className,
        onChange, // change value
        value,
        placeholder,
        type = 'text', // default type text
        readOnly,
        ...otherProps
    } = props;


    const MODS_CLASSNAME = {
        [cls.readOnly]:readOnly
    }
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // if onChange is void function will not call
        onChange?.(event.target.value);
    }
    return (
        <div
            className={classNames(cls.InputWrapper)}>

            <div className={cls.inputContent}>

            {/*if placeholder come in props*/}
            {placeholder && (
                <div className={classNames(cls.placeholder)}>
                    {placeholder}
                </div>
            )}
            <input
                readOnly={readOnly}
                className={classNames(cls.input, {}, [className])}
                type={type}
                value={value}
                onChange={onChangeHandler}
            />
            </div>
        </div>
    );
});
