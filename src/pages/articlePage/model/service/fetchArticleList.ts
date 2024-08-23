
// async request to api
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Profile} from "entities/profile";
import {ThunkConfig} from "app/providers/storeProvider/config/StateSchema";
import i18n from "shared/config/i18n/i18n";
import {Article, ArticleType} from "entities/singleArticle/model/types/Article";
import {
    articlePageLimitSelector,
    articlePageNumberPageSelector,
    articlePageSearchStringSelector,
    articlePageSortFieldSelector,
    articlePageSortOrderSelector,
    articlePageTypeArticleSelector
} from "pages/articlePage/model/selectors/articlePageSelector";
import {useSelector} from "react-redux";
import {use} from "i18next";
import {addQueryParams} from "shared/lib/url/AddQueryParams/AddQueryParams";

export interface FetchArticleListProps{
    replace?: boolean // add data to the end list or not
}

export const fetchArticleList =

    // 1 arg -> return type, 2 arg -> type of arg, 3 arg -> type of error, extra
    createAsyncThunk<Article[], FetchArticleListProps, ThunkConfig<string>>(
        'singleArticle/fetchArticleByID',



        async (listProps, thunkAPI) => {
            // const {t} = useTranslation();
            const {
                extra,
                rejectWithValue,
                getState
            } = thunkAPI;

                // get values from state
                const searchValue = articlePageSearchStringSelector(getState())
                const orderSort = articlePageSortOrderSelector(getState())
                const fieldsSort = articlePageSortFieldSelector(getState())
                const page = articlePageNumberPageSelector(getState())
                const limit = articlePageLimitSelector(getState());

                // selected types of articles // science, IT, etc
                const typeOfArticles = articlePageTypeArticleSelector(getState())
            try {

                // add query params
                addQueryParams({fieldsSort, orderSort, searchValue}) // ?search=kotlin&fieldsSort=createdAt&orderSort=asc&searchValue=golang
                const response = await extra.api.get<Article[]>("/articles", {
                    params:{
                        _expand: 'user',
                        _limit:limit, // limit for one page
                        _page:page, // number page
                        _sort:fieldsSort, // quantity views, title, created_at
                        _order:orderSort, // asc or desc
                        q: searchValue, // q -> query for search
                        type: typeOfArticles === ArticleType.ALL ? undefined : typeOfArticles // if selected ALL values, we send request without types
                    }
                })


                return response.data
            }catch (error){
                console.log("Ошибка при попытке запроса статьи: " + error);
                return rejectWithValue(i18n.t('Ошибка при попытке запроса статьи'));
            }
        },
    )