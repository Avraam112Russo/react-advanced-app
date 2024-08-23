import {
    createEntityAdapter,
    createSlice,
    configureStore, EntityState, type PayloadAction,
} from '@reduxjs/toolkit'
import {Comment} from "entities/comment";
import {StateSchema} from "app/providers/storeProvider";
import {ArticleDetailsCommentSchema} from "pages/articleDetailsPage";
import {FetchArticleById} from "entities/article/model/services/fetchArticleById/FetchArticleById";
import {Article} from "entities/article/model/types/Article";
import {
    FetchCommentByArticleId
} from "pages/articleDetailsPage/model/services/fetchCommentByArticleId/FetchCommentByArticleId";


const CommentAdapter = createEntityAdapter<Comment>({
    // field that we need for normalizing data
    selectId: (comment: Comment) => comment.id,

})
// usage selector we get normalizing data
export const getArticleCommentSelector =
    CommentAdapter.getSelectors<StateSchema>((state) =>
    state.article_details_comment || CommentAdapter.getInitialState()
)

const ArticleDetailsCommentSlice = createSlice({
    name: 'ArticleDetailsCommentSlice',
    initialState: CommentAdapter.getInitialState<ArticleDetailsCommentSchema>({
        error: undefined,
        isLoading:false,

        // normalizing data
        ids:[],
        entities:{}
    }),
    reducers: {},


    // we need this block code for change state after make request to backend
    extraReducers: (builder) => {
        builder

            // pending == request in process
            .addCase(FetchCommentByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })

            // fulfilled == request is successfully completed
            .addCase(FetchCommentByArticleId.fulfilled, (
                state,
                action: PayloadAction<Comment[]>,
            ) => {

                state.isLoading = false;
                CommentAdapter.setAll(state, action.payload) // 1 arg -> куда добавить данные, 2 arg -> какие данные добавить

            })

            // rejected == request return error
            .addCase(FetchCommentByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })



    },
})

export const {reducer: ArticleDetailsCommentReducer} = ArticleDetailsCommentSlice;
export const {actions: ArticleDetailsCommentAction} = ArticleDetailsCommentSlice;