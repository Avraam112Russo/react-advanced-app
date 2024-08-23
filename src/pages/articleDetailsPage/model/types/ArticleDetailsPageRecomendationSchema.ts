import {EntityState} from "@reduxjs/toolkit";
import {Article} from "entities/singleArticle/model/types/Article";

export interface ArticleDetailsPageRecommendationSchema extends EntityState<Article>{
    error?:string,
    isLoading?:boolean
}