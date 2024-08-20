import {StateSchema} from "app/providers/storeProvider";

export const getArticleCommentIsLoadingSelector = (state:StateSchema) => state?.article_details_comment?.isLoading
export const getArticleCommentErrorSelector = (state:StateSchema) => state?.article_details_comment?.error

