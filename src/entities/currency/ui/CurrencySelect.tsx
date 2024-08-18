import {classNames} from "shared/lib/classNames/classNames";
import cls from "./CurrencySelect.module.scss"
import {Select} from "shared/ui/select/Select";
import {MyCurrency} from "entities/currency/model/types/Currency";
import {memo, useCallback} from "react";

import {MyCountry} from "entities/country/model/types/Country";
export interface CurrencySelectProps {
    className?: string,
    value?: MyCurrency, // selected value
    onChange?:(value:MyCurrency) => void, // change value
    readOnly?:boolean
}


const listOfOptions = [
    {value: MyCurrency.USD, content: MyCurrency.USD},
    {value: MyCurrency.RUB, content: MyCurrency.RUB},
    {value: MyCurrency.EUR, content: MyCurrency.EUR},
];

export const CurrencySelect = memo((props:CurrencySelectProps) => {
    const {className, value, onChange, readOnly} = props;
    const onChangeHandler = useCallback((value:string) => {
        onChange?.(value as MyCurrency)
    }, [onChange])
    return (
        <Select
            value={value}
            onChange={onChangeHandler}
            label={"Select your currency: "}
            option={listOfOptions}
            readOnly={readOnly}
        />
    );
});
