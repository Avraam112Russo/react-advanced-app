import {MyCurrency} from "entities/currency/model/types/Currency";

import {MyCountry} from "entities/country/model/types/Country";

export interface Profile{
        first?:string,
        lastname?: string,
        age?: number,
        currency?: MyCurrency,
        country?: MyCountry,
        city?: string,
        username?: string,
        avatar?: string
}
export interface ProfileSchema{
    data?: Profile, // data from server
    form?: Profile // data that user changed
    isLoading: boolean,
    error?: string,
    readonly: boolean
}