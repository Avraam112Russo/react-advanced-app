import {Article} from "entities/article/model/types/Article";

export interface ArticleDetailsSchema {
    isLoading:boolean,
    error?:string,
    data: Article
}
