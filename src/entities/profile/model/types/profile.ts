import {MyCurrency} from "entities/currency/model/types/Currency";

import {MyCountry} from "entities/country/model/types/Country";


export enum VALIDATE_PROFILE_ERROR {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    SERVER_ERROR_500 = 'SERVER_ERROR_500',
}
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
    readonly: boolean,
    validateError?:VALIDATE_PROFILE_ERROR[]
}