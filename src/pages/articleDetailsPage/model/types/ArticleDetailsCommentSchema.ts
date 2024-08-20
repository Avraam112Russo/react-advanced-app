import {Comment} from "entities/comment";
import {EntityState} from "@reduxjs/toolkit";



// extends EntityState<Comment> for normalizing store data
export interface ArticleDetailsCommentSchema extends EntityState<Comment>{
    isLoading:boolean,
    error?:string
}