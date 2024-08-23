import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider/config/StateSchema";
import i18n from "shared/config/i18n/i18n";
import {Article} from "entities/singleArticle/model/types/Article";


export const fetchRecommendationArticleList =

    // 1 arg -> return type, 2 arg -> type of arg, 3 arg -> type of error, extra
    createAsyncThunk<Article[], void, ThunkConfig<string>>(
        'articleDetailsPage/fetchArticlesRecommendation',

        async (__, thunkAPI) => {
            // const {t} = useTranslation();
            const {
                extra,
                rejectWithValue,
            } = thunkAPI;

            // selected types of articles // science, IT, etc
            try {

                // add query params
                const response = await extra.api.get<Article[]>("/articles", {
                    params:{
                        _limit: 4,
                    }
                })


                return response.data
            }catch (error){
                console.log("Ошибка при попытке запроса рекомендация: " + error);
                return rejectWithValue(i18n.t('Ошибка при попытке запроса рекомендация'));
            }
        },
    )