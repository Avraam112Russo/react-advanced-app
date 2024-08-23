import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {ArticleDetailsSchema} from "entities/singleArticle/model/types/ArticleDetailsSchema";
import {FetchArticleById} from "entities/singleArticle/model/services/fetchArticleById/FetchArticleById";
import {Article} from "entities/singleArticle/model/types/Article";

const initialState: ArticleDetailsSchema = {
    isLoading:false,
    error:undefined,
    data: undefined,
}


export const ArticleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {
    },




    // we need this block code for change state after make request to backend
    extraReducers: (builder) => {
        builder

            // pending == request in process
            .addCase(FetchArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })

            // fulfilled == request is successfully completed
            .addCase(FetchArticleById.fulfilled, (
                state,
                action: PayloadAction<Article>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;

            })

            // rejected == request return error
            .addCase(FetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })



    },
})

export const {actions: ArticleDetailsActions} = ArticleDetailsSlice;
export const {reducer: ArticleDetailsReducer} = ArticleDetailsSlice;

