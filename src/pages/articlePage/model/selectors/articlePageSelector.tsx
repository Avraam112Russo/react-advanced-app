import {StateSchema} from "app/providers/storeProvider";
import {ArticleSortField, ArticleType, ArticleViewType} from "entities/singleArticle/model/types/Article";

export const articlePageIsLoadingSelector = (state:StateSchema) => state?.articlesPage?.isLoading || false
export const articlePageErrorSelector = (state:StateSchema) => state?.articlesPage?.error
export const articlePageViewTypeSelector = (state:StateSchema) => state?.articlesPage?.view || ArticleViewType.SMALL
export const articlePageNumberPageSelector = (state:StateSchema) => state?.articlesPage?.page
export const articlePageLimitSelector = (state:StateSchema) => state?.articlesPage?.limit
export const articlePageHasMoreSelector = (state:StateSchema) => state?.articlesPage?.hasMore
export const articlePageInitStateSelector = (state:StateSchema) => state?.articlesPage?._inited
export const articlePageSearchStringSelector = (state:StateSchema) => state?.articlesPage?.search ?? ''
export const articlePageSortOrderSelector = (state:StateSchema) => state?.articlesPage?.order || "asc"
export const articlePageSortFieldSelector = (state:StateSchema) => state?.articlesPage?.sort || ArticleSortField.CREATED_AT
export const articlePageTypeArticleSelector = (state:StateSchema) => state?.articlesPage?.type ?? ArticleType.ALL