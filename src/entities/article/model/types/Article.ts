import {User} from "entities/user";

export type ArticleSortOrder = "asc" | "desc";

// fields for type sort
export enum ArticleSortField{
    VIEW = "views", // sort by quantity view
    TITLE = "title",
    CREATED_AT = "createdAt",
}


export enum ArticleViewType{
    BIG = 'BIG',
    SMALL = 'SMALL'
}



export type ArticleBlock = ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock

 export enum ArticleBlockType{
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
    CODE = 'CODE'
 }

export interface ArticleBaseBlock{
    id:string,
    type:ArticleBlockType
}
export interface ArticleImageBlock extends ArticleBaseBlock{
    type: ArticleBlockType.IMAGE;
    src:string;
    title:string;
}
export interface ArticleTextBlock extends ArticleBaseBlock{
    type: ArticleBlockType.TEXT;
    title?:string;
    paragraphs:string[];
}
export interface ArticleCodeBlock extends ArticleBaseBlock{
    type: ArticleBlockType.CODE;
    code:string;
}


export enum ArticleType{
    IT = 'IT',
    ECONOMICS = 'ECONOMICS',
    SCIENCE = 'SCIENCE',
    SPORT = 'SPORT',
    ALL = 'ALL',
}
export interface Article {
    id: string;
    title: string;
    subtitle: string;
    img: string;
    user:User;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}
