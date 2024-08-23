import {StateSchema} from "app/providers/storeProvider";

export const articleDetailsPage_Recommendation_IsLoading_Selector = (state:StateSchema) => state?.recommendation?.isLoading
export const articleDetailsPage_Recommendation_Error_Selector = (state:StateSchema) => state?.recommendation?.error

