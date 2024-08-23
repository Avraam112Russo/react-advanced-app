import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Select.module.scss"
import {ChangeEvent, memo, useMemo} from "react";


export interface Select_Type_Option{
    value?:string,
    content?:string
}

export interface SelectProps {
    className?: string,
    label?: string,
    option?: Select_Type_Option[],
    value?:string, // show selected value
    onChange?:(value:string) => void, // select value
    readOnly?:boolean

}
export const Select = memo((props:SelectProps) => {
    const {className, label, option, value, onChange, readOnly} = props;
    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        if (onChange){
        onChange(event.target.value)
        }
    }
    const optionList = useMemo(() => {
        return option?.map((opt)=> (

            <option
                key={opt.value}
                className={classNames(cls.option)}
                value={opt.value} >
                {opt.content}
            </option>
        ))
    }, [])
    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {
                label &&(
          <span className={cls.label}>
              {label}
          </span>
                )}
            <select
                disabled={readOnly}
                value={value}
                onChange={onChangeHandler}
                className={classNames(cls.select)} name="" id="">
                {optionList}
            </select>
        </div>
    );
});
