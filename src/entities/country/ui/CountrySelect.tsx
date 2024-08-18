import {classNames} from "shared/lib/classNames/classNames";
import cls from "./CountrySelect.module.scss"
import {Select} from "shared/ui/select/Select";
import {MyCountry} from "entities/country/model/types/Country";
import {memo, useCallback} from "react";

export interface CountrySelectProps {
    className?: string,
    value?:MyCountry,
    onChange?: (value:MyCountry) => void,
    readOnly?:boolean
}
const listOfOptions = [
    {value: MyCountry.RUSSIA, content: MyCountry.RUSSIA},
    {value: MyCountry.BELARUS, content: MyCountry.BELARUS},
    {value: MyCountry.KAZAKHSTAN, content: MyCountry.KAZAKHSTAN},
];


export const CountrySelect = memo(({className, value, onChange, readOnly}:CountrySelectProps) => {
    const onChangeHandler = useCallback((value:string) => {
        onChange?.(value as MyCountry)
    }, [onChange])
    return (
        <Select
            value={value}
            onChange={onChangeHandler}
            label={"Select your country: "}
            option={listOfOptions}
            readOnly={readOnly}
        />
    );
});

