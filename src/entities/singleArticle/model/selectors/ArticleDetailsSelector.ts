import {StateSchema} from "app/providers/storeProvider";


// selectors for single singleArticle page
export const getArticleDetailsData = ((state: StateSchema) => state?.article_details?.data)
export const getArticleDetailsIsLoading = ((state: StateSchema) => state?.article_details?.isLoading)
export const getArticleDetailsError = ((state: StateSchema) => state?.article_details?.error)