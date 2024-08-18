import {CounterSchema} from "entities/counter";
import {UserSchema} from "entities/user";
import {LoginSchema} from "features/authByUsername/model/types/LoginSchema";
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {ProfileSchema} from "entities/profile";
import {AxiosInstance} from "axios";
import {To} from "history";
import {NavigateOptions} from "react-router";



// source reducer
export interface StateSchema {

    //default static reducers
    counter: CounterSchema,
    user: UserSchema,

    // lazy reducers
    login?: LoginSchema,
    profile?:ProfileSchema,
}

// retrieve keys of StateSchema (counter, user, login)
export type State_Schema_Key = keyof StateSchema;






// function createReducerManager
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action:AnyAction) => CombinedState<StateSchema> ,
    add: (key:State_Schema_Key, reducer:Reducer) => void,
    remove: (key:State_Schema_Key) => void;
}





// create type for store manager for lazy loading reducers
export interface Redux_Store_With_Manager extends EnhancedStore<StateSchema>{
    reducerManager: ReducerManager
}
export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void,
}
export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg,
    state: StateSchema
}
