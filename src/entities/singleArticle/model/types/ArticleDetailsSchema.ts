import {Article} from "entities/singleArticle/model/types/Article";

export interface ArticleDetailsSchema {
    isLoading:boolean,
    error?:string,
    data: Article
}
