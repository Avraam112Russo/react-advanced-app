import {StateSchema} from "app/providers/storeProvider";

export const Get_AddNewCommentTextSelector = (state:StateSchema) => state?.addNewComment?.text
export const Get_AddNewCommentErrorSelector = (state:StateSchema) => state?.addNewComment?.error