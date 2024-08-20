import {CounterSchema} from "entities/counter";
import {UserSchema} from "entities/user";
import {LoginSchema} from "features/authByUsername/model/types/LoginSchema";
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {ProfileSchema} from "entities/profile";
import {AxiosInstance} from "axios";
import {To} from "history";
import {NavigateOptions} from "react-router";
import {ArticleDetailsSchema} from "entities/article/model/types/ArticleDetailsSchema";
import {ArticleDetailsCommentSchema} from "pages/articleDetailsPage";



// source reducer
export interface StateSchema {

    //default static reducers
    counter: CounterSchema,
    user: UserSchema,

    // lazy reducers with (?)
    login?: LoginSchema,
    profile?:ProfileSchema,
    article_details?: ArticleDetailsSchema,
    article_details_comment?: ArticleDetailsCommentSchema,
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
