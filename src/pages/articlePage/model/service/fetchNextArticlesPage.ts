import {ThunkConfig} from "app/providers/storeProvider/config/StateSchema";
import {
    articlePageHasMoreSelector, articlePageIsLoadingSelector,
    articlePageNumberPageSelector
} from "pages/articlePage/model/selectors/articlePageSelector";
import {articlePageAction} from "pages/articlePage/model/slice/articlePageSlice";
import {fetchArticleList} from "pages/articlePage/model/service/fetchArticleList";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const hasMore = articlePageHasMoreSelector(getState());
        const page = articlePageNumberPageSelector(getState());
        const isLoading = articlePageIsLoadingSelector(getState());

        if (hasMore && !isLoading) {
            dispatch(articlePageAction.setPage(page + 1));
            dispatch(fetchArticleList({

            }));
        }
    },
);