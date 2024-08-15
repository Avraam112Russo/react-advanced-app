import {classNames} from "shared/lib/classNames";
import cls from "./Input.module.scss"
import React, {InputHTMLAttributes, memo} from "react";


// usage Omit<> we can retrieve all necessary props and exclude unnecessary props
// we create our custom props 'value' and 'onChange' and exclude them
type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

export interface InputProps extends HtmlInputProps {
    className?: string,
    value?: string,
    onChange?: (value: string) => void, // change value
}

// memo save object and we can reuse
export const Input = memo((props:InputProps) => {
    const {
        className,
        onChange, // change value
        value,
        placeholder,
        type = 'text', // default type text
        ...otherProps
    } = props;
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // if onChange is void function will not call
        onChange?.(event.target.value);
    }
    return (
        <div
            className={classNames(cls.InputWrapper)}>


            {/*if placeholder come in props*/}
            {placeholder && (
                <div className={classNames(cls.placeholder)}>
                    {placeholder}
                </div>
            )}
            <input
                className={classNames(cls.input)}
                type={type}
                value={value}
                onChange={onChangeHandler}
            />
        </div>
    );
});
