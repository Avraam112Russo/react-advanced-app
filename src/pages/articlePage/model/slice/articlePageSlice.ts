import {createEntityAdapter, createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {StateSchema} from "app/providers/storeProvider";
import {
    Article,
    ArticleSortField,
    ArticleSortOrder,
    ArticleType,
    ArticleViewType
} from "entities/singleArticle/model/types/Article";
import {ArticlePageSchema} from "pages/articlePage";
import {fetchArticleList} from "pages/articlePage/model/service/fetchArticleList";
import {LOCAL_STORAGE_ARTICLE_VIEW} from "shared/global_const/local_storage";


export const ArticlesAdapter = createEntityAdapter<Article>({
    // field that we need for normalizing data
    selectId: (article: Article) => article.id,

})
// usage selector we get normalizing data
export const getArticleSelector =
    ArticlesAdapter.getSelectors<StateSchema>((state) =>
        state.articlesPage || ArticlesAdapter.getInitialState()
    )

const articlePageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: ArticlesAdapter.getInitialState<ArticlePageSchema>({
        error: undefined,
        isLoading:false,
        view:ArticleViewType.SMALL, // list ot tiles
        page:1, // page number
        hasMore:true, // has more articles in the backend

        // normalizing data
        ids:[],
        entities:{},


        _inited:true,
        limit: 9, // limit data per one page
        order: 'asc', // 123 or 321
        sort:ArticleSortField.CREATED_AT, // fields for sort
        search:'', // search string
        type: ArticleType.ALL // science, economics, it
    }),
    reducers: {
        setView: (state, action) => {
            state.view = action.payload
            localStorage.setItem(LOCAL_STORAGE_ARTICLE_VIEW, action.payload) // save selected singleArticle view
        },
        setPage: (state, action:PayloadAction<number>) => {
            state.page = action.payload
        },
        setSortField: (state, action:PayloadAction<ArticleSortField>) => {
            state.sort = action.payload
        },

        setOrder: (state, action:PayloadAction<ArticleSortOrder>) => {
            state.order = action.payload
        },

        setSearch: (state, action:PayloadAction<string>) => {
            state.search = action.payload
        },
        setType: (state, action:PayloadAction<ArticleType>) => {
            state.type = action.payload
        },
        initStateArticleView: (state) => {
            const view = localStorage.getItem(LOCAL_STORAGE_ARTICLE_VIEW) as ArticleViewType
            state.view = view;
            state.limit = view === ArticleViewType.BIG? 4 : 6 // if big type view we show only 4 singleArticle in one page
            state._inited=true
        }

    },// we need this block code for change state after make request to backend
    extraReducers: (builder) => {
        builder

            // pending == request in process
            .addCase(fetchArticleList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                if (action.meta.arg.replace){
                    ArticlesAdapter.removeAll(state) // if we use filter sort, clear list of articles
                }
            })

            // fulfilled == request is successfully completed
            .addCase(fetchArticleList.fulfilled, (
                state,
                action,
            ) => {

                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;
                if (action.meta.arg.replace){
                    ArticlesAdapter.setAll(state, action.payload) // setAll просто загруэжает заново данные, а не добавляет их в конец
                } else {
                    ArticlesAdapter.addMany(state, action.payload)// addMany загружает данные в конец
                }
            })

            // rejected == request return error
            .addCase(fetchArticleList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })



    },






})

export const {reducer: articlePageReducer} = articlePageSlice;
export const {actions: articlePageAction} = articlePageSlice;