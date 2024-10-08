import {CounterSchema} from "entities/counter";
import {UserSchema} from "entities/user";
import {LoginSchema} from "features/authByUsername/model/types/LoginSchema";
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {ProfileSchema} from "entities/profile";
import {AxiosInstance} from "axios";
import {To} from "history";
import {NavigateOptions} from "react-router";
import {ArticleDetailsSchema} from "entities/singleArticle/model/types/ArticleDetailsSchema";
import {ArticleDetailsCommentSchema} from "pages/articleDetailsPage";
import {AddNewCommentSchema} from "features/addNewComment";
import {ArticlePageSchema} from "pages/articlePage";
import {SaveScrollSchema} from "features/scrollSave";
import {
    ArticleDetailsPageRecommendationSchema
} from "pages/articleDetailsPage/model/types/ArticleDetailsPageRecomendationSchema";



// source reducer
export interface StateSchema {

    //default static reducers
    counter: CounterSchema,
    user: UserSchema,
    saveScroll: SaveScrollSchema,


    // lazy reducers with (?)
    login?: LoginSchema,
    profile?:ProfileSchema,
    article_details?: ArticleDetailsSchema,
    article_details_comment?: ArticleDetailsCommentSchema,
    addNewComment?: AddNewCommentSchema,
    articlesPage?:ArticlePageSchema,
    recommendation?: ArticleDetailsPageRecommendationSchema
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
    api: AxiosInstance
}
export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg,
    state: StateSchema
}
