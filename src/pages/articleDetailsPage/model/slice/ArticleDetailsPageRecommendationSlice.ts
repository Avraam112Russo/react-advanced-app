import {createEntityAdapter, createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {StateSchema} from "app/providers/storeProvider";
import {Article} from "entities/singleArticle/model/types/Article";
import {
    ArticleDetailsPageRecommendationSchema
} from "pages/articleDetailsPage/model/types/ArticleDetailsPageRecomendationSchema";
import {
    fetchRecommendationArticleList
} from "pages/articleDetailsPage/model/services/fetchRecommendationListArticles/fetchRecommendationListArticles";


const RecommendationAdapter = createEntityAdapter<Article>({
    // field that we need for normalizing data
    selectId: (article: Article) => article.id,

})
// usage selector we get normalizing data
// нам не нужно создавать вручную селектор для получения data из state, только для isLoading and error
export const getArticle_Recommendation_Selector =
    RecommendationAdapter.getSelectors<StateSchema>((state) =>
        state.recommendation || RecommendationAdapter.getInitialState()
    )

const ArticleDetails_Recommendation_Slice = createSlice({
    name: 'ArticleDetailsCommentSlice',
    initialState: RecommendationAdapter.getInitialState<ArticleDetailsPageRecommendationSchema>({
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
            .addCase(fetchRecommendationArticleList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })

            // fulfilled == request is successfully completed
            .addCase(fetchRecommendationArticleList.fulfilled, (
                state,
                action: PayloadAction<Article[]>,
            ) => {

                state.isLoading = false;
                RecommendationAdapter.setAll(state, action.payload) // 1 arg -> куда добавить данные, 2 arg -> какие данные добавить

            })

            // rejected == request return error
            .addCase(fetchRecommendationArticleList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })



    },
})

export const {reducer: ArticleDetailsPage_Recommendation_Reducer} = ArticleDetails_Recommendation_Slice;
export const {actions: ArticleDetails_Recommendation_Action} = ArticleDetails_Recommendation_Slice;