import {EntityState} from "@reduxjs/toolkit";
import {Comment} from "entities/comment";
import {
    Article,
    ArticleViewType,
    ArticleSortOrder,
    ArticleSortField,
    ArticleType
} from "entities/singleArticle/model/types/Article";

export interface ArticlePageSchema extends EntityState<Article >{
    isLoading?:boolean,
    error?:string,

    view:ArticleViewType,

    // pagination
    page:number,
    limit?:number,
    hasMore:boolean,

    // first time initialized state or not
    _inited:boolean,

    // filters
    order: ArticleSortOrder, // asc or desc
    sort: ArticleSortField,
    search: string, // search query
    type:ArticleType
}